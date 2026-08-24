import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/errorTypes.js";
import { verify } from "../modules/auth/jwt.service.js";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedError("Authentication required");
  }
  try {
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      throw new UnauthorizedError("Invalid authorization header");
    }

    const payload = verify(token);

    req.user = payload;

    next();
  } catch (error) {
    return next(new UnauthorizedError("Invalid or expired token"));
  }
}
