import express from "express";
import { login, register } from "./auth.controller.js";
import {
  validateBody,
  validateParams,
} from "../../middleware/validationMiddleware.js";
import { createUserSchema } from "../../types/userType.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), register);

authRouter.post("/login", login);

export default authRouter;
