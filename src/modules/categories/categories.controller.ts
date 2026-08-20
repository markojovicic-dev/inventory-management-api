import type { Request, Response, NextFunction } from "express";
import * as categoriesService from "./categories.service.js";

export async function getAllCategories(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const categories = await categoriesService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const category = await categoriesService.getCategory(id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const category = await categoriesService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const category = await categoriesService.updateCategory(id, req.body);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    await categoriesService.deleteCategory(id);
    res.status(200).json({ message: `Category with id ${id} is deleted.` });
  } catch (error) {
    next(error);
  }
}
