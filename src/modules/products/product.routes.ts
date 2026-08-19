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

const productRouter = Express.Router();

productRouter.get("/", getProducts);

productRouter.get("/:id", validateParams(productIdSchema), getProduct);

productRouter.post(
  "/",
  authenticate,
  validateBody(createProductSchema),
  createProduct,
);

productRouter.put(
  "/:id",
  authenticate,
  validateParams(productIdSchema),
  validateBody(createProductSchema),
  updateProduct,
);

productRouter.patch(
  "/:id",
  authenticate,
  validateParams(productIdSchema),
  validateBody(updateProductSchema),
  updateProduct,
);

productRouter.delete(
  "/:id",
  authenticate,
  validateParams(productIdSchema),
  deleteProduct,
);

export default productRouter;
