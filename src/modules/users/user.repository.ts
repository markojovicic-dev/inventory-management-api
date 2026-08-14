import pool from "../../config/database.js";

export async function getUsers() {
  const [result] = await pool.execute(`SELECT * FROM users`);
  return result;
}

export async function getUser(id: number) {
  const [result] = await pool.execute(`SELECT * FROM users`);
  return result;
}

export async function createUser(
  name: string,
  last_name: string,
  email: string,
  password_hash: string,
) {
  const [result] = await pool.execute(
    `INSERT INTO users (name, last_name, email, password_hash) VALUES (?, ?, ?, ?)`,
    [name, last_name, email, password_hash],
  );
  return result;
}

export async function deleteUser(id: number) {
  await pool.execute(`DELETE FROM users WHERE id = ?`, [id]);
}
