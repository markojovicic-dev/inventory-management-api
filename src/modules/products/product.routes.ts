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

const productRouter = Express.Router();

productRouter.get("/", getProducts);

productRouter.get("/:id", validateParams(productIdSchema), getProduct);

productRouter.post("/", validateBody(createProductSchema), createProduct);

productRouter.put(
  "/:id",
  validateParams(productIdSchema),
  validateBody(createProductSchema),
  updateProduct,
);

productRouter.patch(
  "/:id",
  validateParams(productIdSchema),
  validateBody(updateProductSchema),
  updateProduct,
);

productRouter.delete("/:id", validateParams(productIdSchema), deleteProduct);

export default productRouter;
