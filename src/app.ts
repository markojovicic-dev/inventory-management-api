import express from "express";
import type { Request, Response, NextFunction } from "express";

import router from "./routes/index.js";
import productRouter from "./modules/products/product.routes.js";
import userRouter from "./modules/users/user.routes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());

app.use(router);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.use(errorMiddleware);

export default app;
