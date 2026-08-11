import * as productRepository from "./product.repository.js";

export async function getProducts() {
  return productRepository.getProdcuts();
}

export async function createProduct(data: {
  name: string;
  sku: string;
  price: number;
  categoryId: number;
  supplierId: number;
}) {
  const { name, sku, price, categoryId, supplierId } = data;
  return productRepository.createPool(name, sku, price, categoryId, supplierId);
}
