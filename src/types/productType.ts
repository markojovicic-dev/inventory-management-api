import * as z from "zod";

export const productIdSchema = z.object({
  id: z.coerce.number().int().positive().min(1),
});

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
  description: z
    .string()
    .trim()
    .min(1, "Description must have at least 1 charachter")
    .max(300, "Descrption must have 300 charachters max")
    .optional(),
  price: z.number().multipleOf(0.01).positive(),
  categoryId: z.number().int().positive(),
  supplierId: z.number().int().positive(),
});

export const updateProductSchema = createProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type CreateProduct = z.infer<typeof createProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
