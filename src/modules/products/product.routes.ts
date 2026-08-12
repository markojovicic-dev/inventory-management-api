import Express from "express";

import {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct,
} from "./products.controller.js";

const productRouter = Express.Router();

productRouter.get("/", getProducts);

productRouter.get("/:id", getProduct);

productRouter.post("/", createProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;
