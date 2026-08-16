import pool from "../../config/database.js";

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

export async function updateProduct(
  id: number,
  name: string,
  sku: string,
  price: number,
  categoryId: number,
  supplierId: number,
) {
  const [result] = await pool.execute(
    `UPDATE products SET name = ?, sku = ?, price = ?, category_id = ?, supplier_id = ? WHERE id = ?`,
    [name, sku, price, categoryId, supplierId, id],
  );
  return result;
}

export async function deleteProduct(id: number) {
  await pool.execute(`DELETE from products WHERE id = ?`, [id]);
}
