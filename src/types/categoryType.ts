import * as z from "zod";

export const categoryIdSchema = z.object({
  id: z.coerce.number().int().positive().min(1),
});

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "There has to be at least 1 character in name")
    .max(32, "Max charachters for an name is 32"),
  description: z
    .string()
    .trim()
    .min(1, "There has to be at least 1 character in description")
    .max(255, "Max charachters in description is 255")
    .optional(),
});

export const updateCategorySchema = createCategorySchema
  .partial()
  .refine((data) => {
    (Object.keys(data).length > 0,
      {
        message: "At least 1 field must be provided",
      });
  });

export type CreateCategory = z.infer<typeof createCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
