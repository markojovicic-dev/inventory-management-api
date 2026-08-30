import type { Request, Response, NextFunction } from "express";
import * as inventoryService from "./inventory.service.js";

export async function getAllInventories(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const inventories = await inventoryService.getInventories();
    res.status(200).json(inventories);
  } catch (error) {
    next(error);
  }
}

export async function getInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const inventory = await inventoryService.getInventory(id);
    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
}

export async function updateInventory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const inventory = await inventoryService.updateInventory(id, req.body);
    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
}
