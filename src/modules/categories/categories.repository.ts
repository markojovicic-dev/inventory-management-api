import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../config/database.js";
import type { CreateCategory } from "../../types/categoryType.js";
import { handleDatabaseErrors } from "../../errors/databaseErrors.js";

export interface Category extends RowDataPacket {
  name: string;
  description: string | null;
}

export async function findAllCategories() {
  try {
    const [result] = await pool.execute<Category[]>(`SELECT * FROM categories`);
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function findCategory(id: number): Promise<Category | null> {
  try {
    const [result] = await pool.execute<Category[]>(
      `SELECT * FROM categories WHERE id = ?`,
      [id],
    );
    return result[0] ?? null;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function createCategory(
  data: CreateCategory,
): Promise<ResultSetHeader> {
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO categories (name, description) VALUES (?, ?)`,
      [data.name, data.description ?? null],
    );
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function updateCategory(
  id: number,
  data: CreateCategory,
): Promise<ResultSetHeader> {
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (data.name !== undefined) {
    fields.push("name = ?");
    values.push(data.name);
  }

  if (data.description !== undefined) {
    fields.push("description = ?");
    values.push(data.description);
  }
  values.push(id);
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE categories SET ${fields.join(", ")} WHERE id = ?`,
      values,
    );
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function deleteCategory(id: number) {
  try {
    await pool.execute<ResultSetHeader>(`DELETE FROM categories WHERE id = ?`, [
      id,
    ]);
  } catch (error) {
    handleDatabaseErrors(error);
  }
}
