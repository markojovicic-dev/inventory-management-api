import type { JwtPayload } from "../modules/auth/jwt.service.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
