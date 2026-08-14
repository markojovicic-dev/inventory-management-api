import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
} from "./user.controller.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

userRouter.post("/", createUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
