import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/errorTypes.js";
import { ZodError } from "zod";

function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err.stack);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }
  return res.status(500).send("Internal server error");
}
export default errorMiddleware;
