import { NotFoundError } from "../../errors/errorTypes.js";
import type { CreateProduct, UpdateProduct } from "../../types/productType.js";
import * as productRepository from "./product.repository.js";
import * as categoryRepository from "../categories/categories.repository.js";
import * as supplierRepository from "../suppliers/supplier.repository.js";

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
  const category = await categoryRepository.findCategory(data.categoryId);
  if (!category) {
    throw new NotFoundError(`Category id ${data.categoryId} not found`);
  }
  const supplier = await supplierRepository.getSupplier(data.supplierId);
  if (!supplier) {
    throw new NotFoundError(`Supplier id ${data.supplierId} not found`);
  }
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
