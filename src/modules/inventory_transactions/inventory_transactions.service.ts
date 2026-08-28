import { NotFoundError } from "../../errors/errorTypes.js";
import type { CreateTransaction } from "../../types/transactionType.js";
import * as transactionsRepository from "./inventory_transactions.repository.js";

export async function getTransactions() {
  return await transactionsRepository.getAllTransactions();
}

export async function getTransaction(id: number) {
  const transaction = await transactionsRepository.getTransaction(id);
  if (!transaction) {
    throw new NotFoundError(`Transaction with ID ${id} does not exists.`);
  }
  return transaction;
}

export async function createTransaction(
  data: transactionsRepository.Transaction,
) {
  return await transactionsRepository.createTransaction(data);
}
