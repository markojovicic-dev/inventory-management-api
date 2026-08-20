import jwt from "jsonwebtoken";
import type { Role, User } from "../users/user.repository.js";

const JWT_SECRET = process.env.JWT_SECRET!;

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export type JwtPayload = {
  userId: User["id"];
  type: "access" | "refresh";
  role: Role;
};

export function sign(userId: User["id"], role: Role): string {
  return jwt.sign({ userId, type: "access", role }, JWT_SECRET, {
    expiresIn: "15m",
  });
}

export function signRefresh(userId: User["id"], role: Role): string {
  return jwt.sign({ userId, type: "refresh", role }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

export function verify(token: string): JwtPayload {
  const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

  if (payload.type !== "access") {
    throw new Error("Invalid token type");
  }
  return payload;
}

export function verifyRefresh(token: string): JwtPayload {
  const payload = jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;

  if (payload.type !== "refresh") {
    throw new Error("Invalid token type");
  }
  return payload;
}

export function decode(token: string): JwtPayload | null {
  return jwt.decode(token) as JwtPayload | null;
}
