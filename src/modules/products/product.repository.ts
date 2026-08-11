import pool from "../../config/database.js";

export async function getProdcuts() {
  const [result] = await pool.execute(`SELECT * FROM products`);
  return result;
}

export async function createPool(
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
