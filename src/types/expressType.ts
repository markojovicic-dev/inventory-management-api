declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        type: "access" | "refresh";
      };
    }
  }
}

export {};
