import type { Request, Response, NextFunction } from "express";
import * as supplierService from "./supplier.service.js";

export async function getSuppliers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const suppliers = await supplierService.getSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    next(error);
  }
}

export async function getSupplier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = Number(req.params.id);
  const supplier = await supplierService.getSupplier(id);
  res.status(200).json(supplier);
}

export async function createSupplier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
}

export async function updateSupplier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const supplier = await supplierService.updateSupplier(id, req.body);
    res.status(200).json(supplier);
  } catch (error) {
    next(error);
  }
}

export async function deleteSupplier(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    await supplierService.deleteSupplier(id);
    res.status(200).json({ message: `Supplier with id: ${id} was deleted.` });
  } catch (error) {
    next(error);
  }
}
