import type { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.login(req.body);
    console.log("req.headers.authorization: ", req.headers.authorization);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
