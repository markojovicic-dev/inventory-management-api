import { NotFoundError } from "../../errors/errorTypes.js";
import type { CreateInventory } from "../../types/inventoryType.js";
import * as inventoryRepositoy from "./inventory.repository.js";

export async function getInventory(id: number) {
  const inventory = await inventoryRepositoy.getInventory(id);
  if (!inventory) {
    throw new NotFoundError("Inventory not found");
  }
  return inventory;
}

export async function getInventories() {
  return await inventoryRepositoy.getAllInventories();
}

export async function updateInventory(id: number, data: CreateInventory) {
  const inventory = await inventoryRepositoy.getInventory(id);
  if (!inventory) {
    throw new NotFoundError("Inventory not found");
  }
  return await inventoryRepositoy.updateInventory(id, data);
}

export async function deleteInventory(id: number) {
  const inventory = await inventoryRepositoy.getInventory(id);
  if (!inventory) {
    throw new NotFoundError("Inventory not found");
  }
  await inventoryRepositoy.deleteInventory(id);
}
