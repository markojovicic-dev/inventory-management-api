import pool from "../../config/database.js";

export async function createRefreshToken(
  userId: number,
  tokenHash: string,
  expiresAt: Date,
  jti: string,
) {
  await pool.execute(
    `INSERT INTO refresh_tokens (user_id, token_hash, jti, expires_at) VALUES (?, ?, ?, ?)`,
    [userId, tokenHash, jti, expiresAt],
  );
}

export async function getRefreshToken(jti: string) {
  const [rows] = await pool.execute(
    `SELECT * FROM refresh_tokens WHERE jti = ? AND revoked_at IS NULL AND expires_at > NOW() LIMIT 1`,
    [jti],
  );
  const tokens = rows as any[];
  return tokens[0] ?? null;
}

export async function revokeRefreshToken(id: number) {
  await pool.execute(
    `UPDATE refresh_tokens SET revoked_at = NOW() WHERE id = ?`,
    [id],
  );
}
