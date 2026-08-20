import Express from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from "./products.controller.js";
import {
  validateParams,
  validateBody,
} from "../../middleware/validationMiddleware.js";
import {
  createProductSchema,
  productIdSchema,
  updateProductSchema,
} from "../../types/productType.js";
import { authenticate } from "../../middleware/authenticateMiddleware.js";
import { authorize } from "../../middleware/authorizationMiddleware.js";

const productRouter = Express.Router();

productRouter.get("/", getProducts);

productRouter.get("/:id", validateParams(productIdSchema), getProduct);

productRouter.post(
  "/",
  authenticate,
  authorize("admin"),
  validateBody(createProductSchema),
  createProduct,
);

productRouter.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateParams(productIdSchema),
  validateBody(createProductSchema),
  updateProduct,
);

productRouter.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validateParams(productIdSchema),
  validateBody(updateProductSchema),
  updateProduct,
);

productRouter.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateParams(productIdSchema),
  deleteProduct,
);

export default productRouter;
