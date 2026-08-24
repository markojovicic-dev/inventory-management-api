import type { Request, Response, NextFunction } from "express";
import type { Role } from "../modules/users/user.repository.js";
import { ForbiddenError, UnauthorizedError } from "../errors/errorTypes.js";

export function authorize(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError("Authentication required"));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError("Insufficient permissions"));
    }

    next();
  };
}
