import pool from "../../config/database.js";
import type { UpdateProduct } from "../../types/productType.js";

export async function getProducts() {
  const [result] = await pool.execute(`SELECT * FROM products`);
  return result;
}

export async function getProduct(productId: number) {
  const [result] = await pool.execute(`SELECT * FROM products WHERE id = ?`, [
    productId,
  ]);
  return result;
}

export async function createProduct(
  name: string,
  sku: string,
  price: number,
  categoryId: number,
  supplierId: number,
) {
  const [result] = await pool.execute(
    `INSERT INTO products
         (name, sku, price, category_id, supplier_id)
        VALUES (?, ?, ?, ?, ?)`,
    [name, sku, price, categoryId, supplierId],
  );
  return result;
}

export async function updateProduct(id: number, data: UpdateProduct) {
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

  const [result] = await pool.execute(
    `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );
  return result;
}

export async function deleteProduct(id: number) {
  await pool.execute(`DELETE from products WHERE id = ?`, [id]);
}
