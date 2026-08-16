import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/errorTypes.js";

async function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err.stack);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).send("Internal server error");
}
export default errorMiddleware;
