import express from "express";
import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
} from "./supplier.controller.js";
import {
  validateBody,
  validateParams,
} from "../../middleware/validationMiddleware.js";
import {
  createSupplierSchema,
  supplierId,
  updateSupplierSchema,
} from "../../types/supplierType.js";

const supplierRoute = express.Router();

supplierRoute.get("/", getSuppliers);

supplierRoute.get("/:id", validateParams(supplierId), getSupplier);

supplierRoute.post("/", validateBody(createSupplierSchema), createSupplier);

supplierRoute.put(
  "/:id",
  validateParams(supplierId),
  validateBody(createSupplierSchema),
  updateSupplier,
);

supplierRoute.patch(
  "/:id",
  validateParams(supplierId),
  validateBody(updateSupplierSchema),
  updateSupplier,
);

supplierRoute.delete("/:id", validateParams(supplierId), deleteSupplier);

export default supplierRoute;
