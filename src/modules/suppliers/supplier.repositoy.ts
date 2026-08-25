import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../config/database.js";
import { handleDatabaseErrors } from "../../errors/databaseErrors.js";
import type {
  CreateSupplier,
  UpdateSupplier,
} from "../../types/supplierType.js";

export interface Supplier extends RowDataPacket {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export async function getSuppliers(): Promise<Supplier[]> {
  try {
    const [result] = await pool.execute<Supplier[]>(
      `SELECT id, name, email, phone, address FROM suppliers`,
    );
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function getSupplier(id: number): Promise<Supplier | null> {
  try {
    const [result] = await pool.execute<Supplier[]>(
      `SELECT id, name, email, phone, address FROM suppliers WHERE id = ? LIMIT 1`,
      [id],
    );
    return result[0] ?? null;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function createSupplier(
  data: CreateSupplier,
): Promise<ResultSetHeader> {
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO suppliers (name, email, phone, address) VALUES (?, ?, ?, ?)`,
      [data.name, data.email, data.phone, data.address],
    );
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function updateSupplier(id: number, data: UpdateSupplier) {
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (data.name !== undefined) {
    fields.push("name = ?");
    values.push(data.name);
  }
  if (data.email !== undefined) {
    fields.push("email = ?");
    values.push(data.email);
  }
  if (data.phone !== undefined) {
    fields.push("phone = ?");
    values.push(data.phone);
  }
  if (data.address !== undefined) {
    fields.push("address = ?");
    values.push(data.address);
  }
  values.push(id);
  try {
    await pool.execute<ResultSetHeader>(
      `UPDATE suppliers SET ${fields.join(", ")} WHERE id = ?`,
      values,
    );
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function deleteSupplier(id: number) {
  try {
    await pool.execute<ResultSetHeader>(`DELETE FROM suppliers WHERE id = ?`, [
      id,
    ]);
  } catch (error) {
    handleDatabaseErrors(error);
  }
}
