import type { Request, Response, NextFunction } from "express";
import * as userService from "./user.service.js";
import { BadRequestError, NotFoundError } from "../../errors/errorTypes.js";

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
// return incorrect user, example: userId is 3, input was 1, return 3 still
export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUser(id);
    if (!user) {
      throw new NotFoundError("User does not exists in database");
    }
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

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUser(id);
    if (!user) {
      throw new NotFoundError("User does not exists in database");
    }
    const updatedUser = await userService.updateUser(id, req.body);
    return res.status(200).json(updatedUser);
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
    const user = await userService.getUser(id);
    if (!user) {
      throw new NotFoundError("User does not exists in database");
    }
    await userService.deleteUser(id);
    res.status(200).json({ message: `User with id ${id} was deleted!` });
  } catch (error) {
    next(error);
  }
}
