import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../config/database.js";
import { handleDatabaseErrors } from "../../errors/databaseErrors.js";
import type { CreateInventory } from "../../types/inventoryType.js";

export interface Inventory extends RowDataPacket {
  product_id: number;
  quantity: number;
  reserved: number;
  reorder_quantity: number;
}

export async function getAllInventories() {
  try {
    const [result] = await pool.execute<Inventory[]>(
      `SELECT id, product_id, quantity, reserved_quantity, reorder_quantity FROM inventory`,
    );
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function getInventory(id: number): Promise<Inventory | null> {
  try {
    const [result] = await pool.execute<Inventory[]>(
      `SELECT id, product_id, quantity, reserved_quantity, reorder_quantity FROM inventory WHERE id = ?`,
      [id],
    );
    return result[0] ?? null;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function getInventoryByProduct(
  product_id: number,
): Promise<Inventory | null> {
  try {
    const [result] = await pool.execute<Inventory[]>(
      `SELECT id, product_id, quantity, reserved_quantity, reorder_quantity FROM inventory WHERE product_id = ?`,
      [product_id],
    );
    return result[0] ?? null;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function createInventory(
  data: CreateInventory,
): Promise<ResultSetHeader> {
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO inventory (product_id, quantity, reserved_quantity, reorder_quantity) VALUES (?, ?, ?, ?)`,
      [data.product_id, data.quantity, data.reserved, data.reorder_quantity],
    );
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function updateInventory(
  id: number,
  data: CreateInventory,
): Promise<ResultSetHeader> {
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (data.quantity !== undefined) {
    fields.push("quantity = ?");
    values.push(data.quantity);
  }
  if (data.reserved !== undefined) {
    fields.push("reserved_quantity = ?");
    values.push(data.reserved);
  }
  if (data.reorder_quantity !== undefined) {
    fields.push("reorder_quantity = ?");
    values.push(data.reorder_quantity);
  }
  values.push(id);
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE inventory SET ${fields.join(", ")} WHERE id = ?`,
      values,
    );
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function deleteInventory(id: number) {
  try {
    await pool.execute<ResultSetHeader>(`DELETE FROM inventory WHERE id = ?`, [
      id,
    ]);
  } catch (error) {
    handleDatabaseErrors(error);
  }
}
