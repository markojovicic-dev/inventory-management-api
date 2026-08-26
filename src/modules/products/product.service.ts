import { NotFoundError } from "../../errors/errorTypes.js";
import type { CreateProduct, UpdateProduct } from "../../types/productType.js";
import * as productRepository from "./product.repository.js";

export async function getProducts() {
  return productRepository.getProducts();
}

export async function getProduct(id: number) {
  const product = await productRepository.getProduct(id);
  if (!product) {
    throw new NotFoundError("Product does not exists in database");
  }
  return product;
}

export async function createProduct(data: CreateProduct) {
  return await productRepository.createProduct(data);
}

export async function updateProduct(id: number, data: UpdateProduct) {
  const product = await productRepository.getProduct(id);
  if (!product) {
    throw new NotFoundError("Product does not exists in database");
  }
  return await productRepository.updateProduct(id, data);
}

export async function deleteProduct(id: number) {
  const product = await productRepository.getProduct(id);
  if (!product) {
    throw new NotFoundError("Product does not exists in database");
  }
  await productRepository.deleteProduct(id);
}
