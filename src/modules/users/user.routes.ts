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

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", validateParams(userIdSchema), getUser);

userRouter.post("/", validateBody(createUserSchema), createUser);

userRouter.put(
  "/:id",
  validateParams(userIdSchema),
  validateBody(createUserSchema),
  updateUser,
);

userRouter.patch(
  "/:id",
  validateParams(userIdSchema),
  validateBody(updateUserSchema),
  updateUser,
);

userRouter.delete("/:id", validateParams(userIdSchema), deleteUser);

export default userRouter;
