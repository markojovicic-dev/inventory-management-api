import { BadRequestError, NotFoundError } from "../../errors/errorTypes.js";
import type { CreateCategory } from "../../types/categoryType.js";
import * as categoriesRepository from "./categories.repository.js";

export async function getAllCategories() {
  return await categoriesRepository.findAllCategories();
}

export async function getCategory(id: number) {
  const category = await categoriesRepository.findCategory(id);
  if (!category) {
    throw new NotFoundError("That category does not exists");
  }
  return category;
}

export async function createCategory(data: CreateCategory) {
  return await categoriesRepository.createCategory(data);
}

export async function updateCategory(id: number, data: CreateCategory) {
  if (Object.keys(data).length === 0) {
    throw new BadRequestError("At least one field is required");
  }
  const category = await categoriesRepository.findCategory(id);
  if (!category) {
    throw new NotFoundError("That category does not exists");
  }
  return await categoriesRepository.updateCategory(id, data);
}

export async function deleteCategory(id: number) {
  const category = await categoriesRepository.findCategory(id);
  if (!category) {
    throw new NotFoundError("Category does not exists in database");
  }
  return await categoriesRepository.deleteCategory(id);
}
