import Express from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from "./products.controller.js";
import { validationMiddleware } from "../../middleware/validationMiddleware.js";
import { createProductSchema } from "../../types/productType.js";

const productRouter = Express.Router();

productRouter.get("/", getProducts);

productRouter.get("/:id", getProduct);

productRouter.post(
  "/",
  validationMiddleware(createProductSchema),
  createProduct,
);

productRouter.put("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;
