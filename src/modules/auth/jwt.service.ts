import jwt from "jsonwebtoken";
import type { User } from "../users/user.repository.js";
import type { Role } from "../../types/authType.js";

const JWT_SECRET = process.env.JWT_SECRET!;

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export type AccessPayload = {
  userId: User["id"];
  type: "access";
  role: Role;
};

export type RefreshPayload = {
  userId: User["id"];
  type: "refresh";
  role: Role;
  jti: string;
};

export function sign(userId: User["id"], role: Role): string {
  return jwt.sign({ userId, type: "access", role }, JWT_SECRET, {
    expiresIn: "15m",
  });
}

export function signRefresh(
  userId: User["id"],
  role: Role,
  jti: string,
): string {
  return jwt.sign({ userId, type: "refresh", role, jti }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

export function verify(token: string): AccessPayload {
  const payload = jwt.verify(token, JWT_SECRET) as AccessPayload;

  if (payload.type !== "access") {
    throw new Error("Invalid token type");
  }
  return payload;
}

export function verifyRefresh(token: string): RefreshPayload {
  const payload = jwt.verify(token, JWT_REFRESH_SECRET) as RefreshPayload;

  if (payload.type !== "refresh") {
    throw new Error("Invalid token type");
  }
  return payload;
}
