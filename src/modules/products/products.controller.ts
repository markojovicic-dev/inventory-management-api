import type { Request, Response, NextFunction } from "express";
import * as productService from "./product.service.js";

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const product = await productService.getProducts();

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

export async function getProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const productId = Number(req.params.id);
    const product = await productService.getProduct(productId);
    if (Array.isArray(product) && product.length === 0) {
      return res
        .status(404)
        .json({ message: "Product does not exists in database" });
    }
    return res.status(200).json(product);
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
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const productId = Number(req.params.id);
    const product = await productService.getProduct(productId);
    if (Array.isArray(product) && product.length === 0) {
      return res
        .status(404)
        .json({ message: "Product does not exists in database" });
    }
    await productService.deleteProduct(productId);
    return res
      .status(200)
      .json({ message: `Deleted product with id: ${productId}` });
  } catch (error) {
    next(error);
  }
}
