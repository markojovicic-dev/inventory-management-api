import Express from "express";

import { getProducts, createProduct } from "./products.controller.js";

const productRouter = Express.Router();

productRouter.get("/", getProducts);

productRouter.post("/", createProduct);

export default productRouter;
