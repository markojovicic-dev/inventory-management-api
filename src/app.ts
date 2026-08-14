import express from "express";

import router from "./routes/index.js";
import productRouter from "./modules/products/product.routes.js";
import userRouter from "./modules/users/user.routes.js";

const app = express();

app.use(express.json());

app.use(router);
app.use("/users", userRouter);
app.use("/products", productRouter);

export default app;
