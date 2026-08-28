import express from "express";
import {
  createTransaction,
  getTransaction,
  getTransactions,
} from "./inventory_transactions.controller.js";
import { validateBody } from "../../middleware/validationMiddleware.js";
import { createTransactionSchema } from "../../types/transactionType.js";
import { authenticate } from "../../middleware/authenticateMiddleware.js";

const transactionRoute = express.Router();

transactionRoute.get("/", getTransactions);

transactionRoute.get("/:id", getTransaction);

transactionRoute.post(
  "/",
  authenticate,
  validateBody(createTransactionSchema),
  createTransaction,
);

export default transactionRoute;
