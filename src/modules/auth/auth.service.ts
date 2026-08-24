import type { CreateUser } from "../../types/userType.js";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import * as refreshTokenRepository from "./refresh-token.repository.js";
import * as userRepository from "../users/user.repository.js";
import type { LoginSchema } from "../../types/authType.js";
import { UnauthorizedError } from "../../errors/errorTypes.js";
import { sign, signRefresh, verifyRefresh } from "./jwt.service.js";

export async function login(data: LoginSchema) {
  const user = await userRepository.getUserByEmail(data.email);
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }
  const validPassword = await verifyPassword(data.password, user.password);
  if (!validPassword) {
    throw new UnauthorizedError("Invalid email or password");
  }
  const jti = randomUUID();
  const accessToken = sign(user.id, user.role);
  const refreshToken = signRefresh(user.id, user.role, jti);
  const tokenHash = await bcrypt.hash(refreshToken, 10);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  await refreshTokenRepository.createRefreshToken(
    user.id,
    tokenHash,
    expiresAt,
    jti,
  );
  return {
    userId: user.id,
    accessToken,
    refreshToken,
  };
}

export async function register(data: CreateUser) {
  const { name, last_name, email, password } = data;
  const hashed_password = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser(
    name,
    last_name,
    email,
    hashed_password,
  );
  return user;
}

export async function refreshToken(refreshToken: string) {
  const payload = verifyRefresh(refreshToken);

  await revokeRefreshToken(refreshToken, payload.jti);

  const newJTI = randomUUID();

  const newRefreshToken = signRefresh(payload.userId, payload.role, newJTI);
  const tokenHash = await bcrypt.hash(newRefreshToken, 10);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);
  await refreshTokenRepository.createRefreshToken(
    payload.userId,
    tokenHash,
    expiresAt,
    newJTI,
  );
  const newAccessToken = sign(payload.userId, payload.role);
  return {
    refreshToken: newRefreshToken,
    accessToken: newAccessToken,
  };
}

export async function logout(refreshToken: string) {
  const payload = verifyRefresh(refreshToken);

  await revokeRefreshToken(refreshToken, payload.jti);
}

export async function revokeRefreshToken(refreshToken: string, jti: string) {
  const storedToken = await refreshTokenRepository.getRefreshToken(jti);
  if (!storedToken) {
    throw new UnauthorizedError("Invalid refresh token");
  }

  const valid = await bcrypt.compare(refreshToken, storedToken.token_hash);
  if (!valid) {
    throw new UnauthorizedError("Invalid refresh token");
  }
  await refreshTokenRepository.revokeRefreshToken(storedToken.id);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}
