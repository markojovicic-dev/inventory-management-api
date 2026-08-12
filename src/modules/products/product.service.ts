import * as productRepository from "./product.repository.js";

export async function getProducts() {
  return productRepository.getProducts();
}

export async function getProduct(id: number) {
  return await productRepository.getProduct(id);
}

export async function createProduct(data: {
  name: string;
  sku: string;
  price: number;
  categoryId: number;
  supplierId: number;
}) {
  const { name, sku, price, categoryId, supplierId } = data;
  return productRepository.createProduct(
    name,
    sku,
    price,
    categoryId,
    supplierId,
  );
}

export async function deleteProduct(id: number) {
  await productRepository.deleteProduct(id);
}
