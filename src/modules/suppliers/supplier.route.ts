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
import { authenticate } from "../../middleware/authenticateMiddleware.js";
import { authorize } from "../../middleware/authorizationMiddleware.js";

const supplierRoute = express.Router();

supplierRoute.get("/", authenticate, getSuppliers);

supplierRoute.get(
  "/:id",
  authenticate,
  validateParams(supplierId),
  getSupplier,
);

supplierRoute.post(
  "/",
  authenticate,
  authorize("admin"),
  validateBody(createSupplierSchema),
  createSupplier,
);

supplierRoute.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateParams(supplierId),
  validateBody(createSupplierSchema),
  updateSupplier,
);

supplierRoute.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validateParams(supplierId),
  validateBody(updateSupplierSchema),
  updateSupplier,
);

supplierRoute.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateParams(supplierId),
  deleteSupplier,
);

export default supplierRoute;
