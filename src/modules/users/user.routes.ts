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
import { authorize } from "../../middleware/authorizationMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", authenticate, authorize("admin"), getUsers);

userRouter.get(
  "/:id",
  authenticate,
  authorize("admin"),
  validateParams(userIdSchema),
  getUser,
);

userRouter.post(
  "/",
  authenticate,
  authorize("admin"),
  validateBody(createUserSchema),
  createUser,
);

userRouter.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validateParams(userIdSchema),
  validateBody(createUserSchema),
  updateUser,
);

userRouter.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validateParams(userIdSchema),
  validateBody(updateUserSchema),
  updateUser,
);

userRouter.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateParams(userIdSchema),
  deleteUser,
);

export default userRouter;
