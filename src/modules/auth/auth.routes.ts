import express from "express";
import { login, logout, refresh, register } from "./auth.controller.js";
import {
  validateBody,
  validateParams,
} from "../../middleware/validationMiddleware.js";
import { createUserSchema } from "../../types/userType.js";
import { authenticate } from "../../middleware/authenticateMiddleware.js";
import { authorize } from "../../middleware/authorizationMiddleware.js";
import { loginSchema } from "../../types/authType.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), register);

authRouter.post("/login", validateBody(loginSchema), login);

authRouter.post("/refresh", refresh);

authRouter.post("/logout", logout);

export default authRouter;
