import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../config/database.js";
import type { CreateProduct, UpdateProduct } from "../../types/productType.js";

export interface Product extends RowDataPacket {
  name: string;
  sku: string;
  price: number;
  categorId: number;
  supplierId: number;
}

export async function getProducts() {
  const [result] = await pool.execute<Product[]>(`SELECT * FROM products`);
  return result;
}

export async function getProduct(productId: number): Promise<Product | null> {
  const [result] = await pool.execute<Product[]>(
    `SELECT * FROM products WHERE id = ?`,
    [productId],
  );
  return result[0] ?? null;
}

export async function createProduct(
  data: CreateProduct,
): Promise<ResultSetHeader> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO products
         (name, sku, price, category_id, supplier_id)
        VALUES (?, ?, ?, ?, ?)`,
    [data.name, data.sku, data.price, data.categoryId, data.supplierId],
  );
  return result;
}

export async function updateProduct(
  id: number,
  data: UpdateProduct,
): Promise<ResultSetHeader> {
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (data.name !== undefined) {
    fields.push("name = ?");
    values.push(data.name);
  }

  if (data.sku !== undefined) {
    fields.push("sku = ?");
    values.push(data.sku);
  }

  if (data.price !== undefined) {
    fields.push("price = ?");
    values.push(data.price);
  }

  if (data.categoryId !== undefined) {
    fields.push("category_id = ?");
    values.push(data.categoryId);
  }

  if (data.supplierId !== undefined) {
    fields.push("supplier_id = ?");
    values.push(data.supplierId);
  }
  values.push(id);

  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );
  return result;
}

export async function deleteProduct(id: number) {
  await pool.execute<ResultSetHeader>(`DELETE from products WHERE id = ?`, [
    id,
  ]);
}
