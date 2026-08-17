import type { Request, Response, NextFunction } from "express";
import * as productService from "./product.service.js";
import { BadRequestError, NotFoundError } from "../../errors/errorTypes.js";

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
    const id = Number(req.params.id);
    const product = await productService.getProduct(id);
    if (!product) {
      throw new NotFoundError("Product does not exists in database");
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

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const product = await productService.getProduct(id);
    if (!product) {
      throw new NotFoundError("Product does not exists in database");
    }
    const updatedProduct = await productService.updateProduct(id, req.body);
    return res.status(200).json(updatedProduct);
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
    const id = Number(req.params.id);
    const product = await productService.getProduct(id);
    if (!product) {
      throw new NotFoundError("Product does not exists in database");
    }
    await productService.deleteProduct(id);
    return res.status(200).json({ message: `Deleted product with id: ${id}` });
  } catch (error) {
    next(error);
  }
}
