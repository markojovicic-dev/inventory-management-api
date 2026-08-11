import express from "express";

import router from "./routes/index.js";
import productRouter from "./modules/products/product.routes.js";

const app = express();

app.use(express.json());

app.use(router);
app.use("/products", productRouter);

export default app;
