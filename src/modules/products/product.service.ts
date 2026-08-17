import type { CreateProduct, UpdateProduct } from "../../types/productType.js";
import * as productRepository from "./product.repository.js";

export async function getProducts() {
  return productRepository.getProducts();
}

export async function getProduct(id: number) {
  return await productRepository.getProduct(id);
}

export async function createProduct(data: CreateProduct) {
  return await productRepository.createProduct(data);
}

export async function updateProduct(id: number, data: UpdateProduct) {
  await productRepository.updateProduct(id, data);
  return await productRepository.getProduct(id);
}

export async function deleteProduct(id: number) {
  await productRepository.deleteProduct(id);
}
