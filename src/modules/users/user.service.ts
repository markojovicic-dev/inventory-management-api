import bcrypt from "bcrypt";
import type { CreateUser, UpdateUser } from "../../types/userType.js";
import * as userRepository from "./user.repository.js";
import { NotFoundError } from "../../errors/errorTypes.js";

export async function getUsers() {
  return await userRepository.getUsers();
}

export async function getUser(id: number) {
  const user = await userRepository.getUser(id);
  if (!user) {
    throw new NotFoundError("User does not exists in database");
  }
  return user;
}

export async function createUser(data: CreateUser) {
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

export async function updateUser(id: number, data: UpdateUser) {
  const user = await userRepository.getUser(id);
  if (!user) {
    throw new NotFoundError("User does not exists in database");
  }
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  await userRepository.updateUser(id, data);
  return await userRepository.getUser(id);
}

export async function deleteUser(id: number) {
  const user = await userRepository.getUser(id);
  if (!user) {
    throw new NotFoundError("User does not exists in database");
  }
  return await userRepository.deleteUser(id);
}
