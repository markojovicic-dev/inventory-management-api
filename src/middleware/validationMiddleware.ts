import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { BadRequestError } from "../errors/errorTypes.js";

export function validationMiddleware(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new BadRequestError(
        result.error.issues.map((issue) => issue.message).join(", "),
      );
    }

    req.body = result.data;

    next();
  };
}
