import type { CreateUser } from "../../types/userType.js";
import bcrypt from "bcrypt";
import * as userRepository from "../users/user.repository.js";
import type { LoginSchema } from "../../types/authType.js";
import { UnauthorizedError } from "../../errors/errorTypes.js";
import { sign, signRefresh } from "./jwt.service.js";

export async function login(data: LoginSchema) {
  const user = await userRepository.getUserByEmail(data.email);
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }
  const validPassword = await verifyPassword(data.password, user.password);
  if (!validPassword) {
    throw new UnauthorizedError("Invalid email or password");
  }
  const accessToken = sign(user.id, user.role);
  const refreshToken = signRefresh(user.id, user.role);
  return {
    userId: user.id,
    accessToken,
    refreshToken,
  };
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
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
