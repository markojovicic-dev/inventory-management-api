import express from "express";
import {
  createInventory,
  deleteInventory,
  getAllInventories,
  getInventory,
  updateInventory,
} from "./inventory.controller.js";
import {
  validateBody,
  validateParams,
} from "../../middleware/validationMiddleware.js";
import {
  createInventorySchema,
  inventoryId,
  updateInventorySchema,
} from "../../types/inventoryType.js";

const inventoryRoute = express.Router();

inventoryRoute.get("/", getAllInventories);

inventoryRoute.get("/:id", validateParams(inventoryId), getInventory);

inventoryRoute.post("/", validateBody(createInventorySchema), createInventory);

inventoryRoute.put(
  "/:id",
  validateParams(inventoryId),
  validateBody(createInventorySchema),
  updateInventory,
);

inventoryRoute.patch(
  "/:id",
  validateParams(inventoryId),
  validateBody(updateInventorySchema),
  updateInventory,
);

inventoryRoute.delete("/:id", validateParams(inventoryId), deleteInventory);

export default inventoryRoute;
