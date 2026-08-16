import * as z from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Must have atleast 1 charach")
    .max(100, "Must be 100 charachters max"),
  sku: z
    .string()
    .trim()
    .min(1, "Must have atleast 1 charach")
    .max(100, "Must be 100 charachters max"),
  price: z.number().multipleOf(0.01).positive(),
  categoryId: z.number().int().positive(),
  supplierId: z.number().int().positive(),
});
