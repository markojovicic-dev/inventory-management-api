import * as supplierRepositoy from "./supplier.repository.js";
import type {
  CreateSupplier,
  UpdateSupplier,
} from "../../types/supplierType.js";
import { NotFoundError } from "../../errors/errorTypes.js";

export async function getSuppliers() {
  const suppliers = await supplierRepositoy.getSuppliers();
  return suppliers;
}

export async function getSupplier(id: number) {
  const supplier = await supplierRepositoy.getSupplier(id);
  if (!supplier) {
    throw new NotFoundError(`There is no supplier with id ${id}`);
  }
  return supplier;
}

export async function createSupplier(data: CreateSupplier) {
  const supplier = await supplierRepositoy.createSupplier(data);
  return supplier;
}

export async function updateSupplier(id: number, data: UpdateSupplier) {
  const supplier = await supplierRepositoy.getSupplier(id);
  if (!supplier) {
    throw new NotFoundError(`There is no supplier with id ${id}`);
  }
  await supplierRepositoy.updateSupplier(id, data);
  return await supplierRepositoy.getSupplier(id);
}

export async function deleteSupplier(id: number) {
  const supplier = await supplierRepositoy.getSupplier(id);
  if (!supplier) {
    throw new NotFoundError(`There is no supplier with id ${id}`);
  }
  await supplierRepositoy.deleteSupplier(id);
}
