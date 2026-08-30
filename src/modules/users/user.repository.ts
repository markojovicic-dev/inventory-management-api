import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../config/database.js";
import type { UpdateUser } from "../../types/userType.js";
import { handleDatabaseErrors } from "../../errors/databaseErrors.js";
import type { Role } from "../../types/authType.js";

export interface User extends RowDataPacket {
  id: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: Role;
}

export async function getUsers() {
  try {
    const [result] = await pool.execute<
      User[]
    >(`SELECT id, name, last_name, email, role
    FROM users`);
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function getUser(id: number): Promise<User | null> {
  try {
    const [result] = await pool.execute<User[]>(
      `SELECT id, name, last_name, email, role FROM users WHERE id = ?`,
      [id],
    );
    return result[0] ?? null;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const [result] = await pool.execute<User[]>(
      `SELECT id, name, last_name, email, role, password FROM users WHERE email = ?`,
      [email],
    );
    return result[0] ?? null;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function createUser(
  name: string,
  last_name: string,
  email: string,
  password: string,
): Promise<ResultSetHeader> {
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO users (name, last_name, email, password) VALUES (?, ?, ?, ?)`,
      [name, last_name, email, password],
    );
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function updateUser(
  id: number,
  data: UpdateUser,
): Promise<ResultSetHeader> {
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (data.name !== undefined) {
    fields.push("name = ?");
    values.push(data.name);
  }

  if (data.last_name !== undefined) {
    fields.push("last_name = ?");
    values.push(data.last_name);
  }

  if (data.email !== undefined) {
    fields.push("email = ?");
    values.push(data.email);
  }

  if (data.password !== undefined) {
    fields.push("password = ?");
    values.push(data.password);
  }

  values.push(id);

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
      values,
    );
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function deleteUser(id: number) {
  try {
    await pool.query<ResultSetHeader>(`DELETE FROM users WHERE id = ?`, [id]);
  } catch (error) {
    handleDatabaseErrors(error);
  }
}
