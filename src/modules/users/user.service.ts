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
  password_hash: string;
}) {
  const { name, last_name, email, password_hash } = data;
  const user = await userRepository.createUser(
    name,
    last_name,
    email,
    password_hash,
  );
  return user;
}

export async function deleteUser(id: number) {
  await userRepository.deleteUser(id);
}
