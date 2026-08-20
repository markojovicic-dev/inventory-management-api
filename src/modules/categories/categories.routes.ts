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

const categoriesRouter = express.Router();

categoriesRouter.get("/", getAllCategories);

categoriesRouter.get("/:id", validateParams(categoryIdSchema), getCategory);

categoriesRouter.post("/", validateBody(createCategorySchema), createCategory);

categoriesRouter.put(
  "/:id",
  validateParams(createCategorySchema),
  updateCategory,
);

categoriesRouter.patch(
  "/:id",
  validateParams(updateCategorySchema),
  updateCategory,
);

categoriesRouter.delete(
  "/:id",
  validateParams(createCategorySchema),
  deleteCategory,
);

export default categoriesRouter;
