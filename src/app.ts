import express from "express";

import router from "./routes/index.js";
import authRuter from "./modules/auth/auth.routes.js";
import productRouter from "./modules/products/product.routes.js";
import userRouter from "./modules/users/user.routes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import categoriesRouter from "./modules/categories/categories.routes.js";

const app = express();

app.use(express.json());

app.use(router);
app.use("/auth", authRuter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoriesRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "This METHOD or this URL does not exists" });
});

app.use(errorMiddleware);

export default app;
