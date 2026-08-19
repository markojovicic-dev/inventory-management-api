import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./user.controller.js";
import {
  validateBody,
  validateParams,
} from "../../middleware/validationMiddleware.js";
import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from "../../types/userType.js";
import { authenticate } from "../../middleware/authenticateMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", validateParams(userIdSchema), getUser);

userRouter.post("/", authenticate, validateBody(createUserSchema), createUser);

userRouter.put(
  "/:id",
  authenticate,
  validateParams(userIdSchema),
  validateBody(createUserSchema),
  updateUser,
);

userRouter.patch(
  "/:id",
  authenticate,
  validateParams(userIdSchema),
  validateBody(updateUserSchema),
  updateUser,
);

userRouter.delete(
  "/:id",
  authenticate,
  validateParams(userIdSchema),
  deleteUser,
);

export default userRouter;
