import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "./categories.controller.js";
import {
  validateBody,
  validateParams,
} from "../../middleware/validationMiddleware.js";
import {
  categoryIdSchema,
  createCategorySchema,
  updateCategorySchema,
} from "../../types/categoryType.js";
import { authenticate } from "../../middleware/authenticateMiddleware.js";
import { authorize } from "../../middleware/authorizationMiddleware.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/", getAllCategories);

categoriesRouter.get("/:id", validateParams(categoryIdSchema), getCategory);

categoriesRouter.post(
  "/",
  authenticate,
  authorize("admin"),
  validateBody(createCategorySchema),
  createCategory,
);

categoriesRouter.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validateParams(categoryIdSchema),
  validateBody(updateCategorySchema),
  updateCategory,
);

categoriesRouter.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validateParams(categoryIdSchema),
  deleteCategory,
);

export default categoriesRouter;
