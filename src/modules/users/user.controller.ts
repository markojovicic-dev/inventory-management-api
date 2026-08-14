import type { Request, Response, NextFunction } from "express";
import * as userService from "./user.service.js";

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUser(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    await userService.deleteUser(id);
    res.status(200).json({ message: `User with id ${id} was deleted!` });
  } catch (error) {
    next(error);
  }
}
