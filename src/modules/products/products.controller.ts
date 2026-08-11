import type { Request, Response, NextFunction } from "express";
import * as productService from "./product.service.js";

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const product = await productService.getProducts();

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}
