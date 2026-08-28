import type { Request, Response, NextFunction } from "express";
import * as transactionsService from "./inventory_transactions.service.js";

export async function getTransactions(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const transactions = await transactionsService.getTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
}

export async function getTransaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const transaction = await transactionsService.getTransaction(id);
    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
}

export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const transactions = await transactionsService.createTransaction({
      ...req.body,
      user_id: req.user!.id,
    });
    res.status(201).json(transactions);
  } catch (error) {
    next(error);
  }
}
