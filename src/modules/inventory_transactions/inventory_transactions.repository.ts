import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../config/database.js";
import { handleDatabaseErrors } from "../../errors/databaseErrors.js";
import { BadRequestError, NotFoundError } from "../../errors/errorTypes.js";

export interface Transaction extends RowDataPacket {
  product_id: number;
  user_id: number;
  type: "IN" | "OUT";
  quantity: number;
}

export async function getAllTransactions() {
  try {
    const [result] = await pool.execute<Transaction[]>(
      `SELECT id, product_id, user_id, type, quantity, created_at FROM inventory_transactions`,
    );
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function getTransaction(id: number): Promise<Transaction | null> {
  try {
    const [result] = await pool.execute<Transaction[]>(
      `SELECT id, product_id, user_id, type, quantity, created_at FROM inventory_transactions WHERE id = ?`,
      [id],
    );
    return result[0] ?? null;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function createTransaction(data: {
  product_id: number;
  type: "IN" | "OUT";
  quantity: number;
  user_id: number;
}) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    if (data.type === "IN") {
      const [result] = await connection.execute<ResultSetHeader>(
        `UPDATE inventory SET quantity = quantity + ? WHERE product_id = ? AND is_active = TRUE`,
        [data.quantity, data.product_id],
      );

      if (result.affectedRows === 0) {
        throw new BadRequestError("Inventory record not found");
      }
    } else if (data.type === "OUT") {
      const [result] = await connection.execute<ResultSetHeader>(
        `UPDATE inventory SET quantity = quantity - ? WHERE product_id = ? AND quantity >= ? AND is_active = TRUE`,
        [data.quantity, data.product_id, data.quantity],
      );
      if (result.affectedRows === 0) {
        throw new BadRequestError("Insufficient inventory");
      }
    } else {
      throw new BadRequestError("Invalid transaction type");
    }
    const transaction = await connection.execute(
      `INSERT INTO inventory_transactions (product_id, user_id, type, quantity) VALUES (?, ?, ?, ?)`,
      [data.product_id, data.user_id, data.type, data.quantity],
    );
    await connection.commit();
    return transaction;
  } catch (error) {
    await connection.rollback();
    handleDatabaseErrors(error);
  } finally {
    connection.release();
  }
}
