import express from "express";
import {
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

inventoryRoute.patch(
  "/:id",
  validateParams(inventoryId),
  validateBody(updateInventorySchema),
  updateInventory,
);

export default inventoryRoute;
