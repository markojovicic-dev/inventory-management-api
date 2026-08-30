import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../config/database.js";
import type { CreateProduct, UpdateProduct } from "../../types/productType.js";
import { handleDatabaseErrors } from "../../errors/databaseErrors.js";

export interface Product extends RowDataPacket {
  id: number;
  name: string;
  sku: string;
  description: string | null;
  price: number;
  category_id: number;
  supplier_id: number;
}

export async function getProducts() {
  try {
    const [result] = await pool.execute<Product[]>(
      `SELECT id, name, sku, price, description, category_id, supplier_id FROM products WHERE is_active = TRUE`,
    );
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function getProduct(productId: number): Promise<Product | null> {
  try {
    const [result] = await pool.execute<Product[]>(
      `SELECT id, name, sku, price, description, category_id, supplier_id FROM products WHERE id = ? AND is_active = TRUE`,
      [productId],
    );
    return result[0] ?? null;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function createProduct(
  data: CreateProduct,
): Promise<ResultSetHeader> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [product] = await connection.execute<ResultSetHeader>(
      `INSERT INTO products
           (name, sku, price, category_id, supplier_id)
          VALUES (?, ?, ?, ?, ?)`,
      [data.name, data.sku, data.price, data.categoryId, data.supplierId],
    );
    await connection.execute<ResultSetHeader>(
      `INSERT INTO inventory (product_id, quantity, reorder_quantity) VALUES (?, ?, ?)`,
      [product.insertId, 0, 0],
    );
    await connection.commit();
    return product;
  } catch (error) {
    await connection.rollback();
    handleDatabaseErrors(error);
  } finally {
    connection.release();
  }
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
  if (data.description !== undefined) {
    fields.push("description = ?");
    values.push(data.description);
  }
  values.push(id);
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE products SET ${fields.join(", ")} WHERE id = ? AND is_active = TRUE`,
      values,
    );
    return result;
  } catch (error) {
    handleDatabaseErrors(error);
  }
}

export async function deactivateProduct(id: number) {
  try {
    await pool.execute<ResultSetHeader>(
      `UPDATE products SET is_active = FALSE WHERE id = ? AND is_active = TRUE`,
      [id],
    );
  } catch (error) {
    handleDatabaseErrors(error);
  }
}
