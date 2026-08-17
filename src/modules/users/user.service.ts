import bcrypt from "bcrypt";
import type { CreateUser, UpdateUser } from "../../types/userType.js";
import * as userRepository from "./user.repository.js";

export async function getUsers() {
  return await userRepository.getUsers();
}

export async function getUser(id: number) {
  return await userRepository.getUser(id);
}

export async function createUser(data: {
  name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  const { name, last_name, email, password } = data;
  const salt = await bcrypt.genSaltSync(10);
  const hashed_password = await bcrypt.hashSync(password, salt);
  const user = await userRepository.createUser(
    name,
    last_name,
    email,
    hashed_password,
  );
  return user;
}

export async function updateUser(id: number, data: UpdateUser) {
  await userRepository.updateUser(id, data);
  return await userRepository.getUser(id);
}

export async function deleteUser(id: number) {
  return await userRepository.deleteUser(id);
}
