import * as z from "zod";

export const supplierId = z.object({
  id: z.coerce.number().int().min(1).positive(),
});

export const createSupplierSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name at least must have 1 charachter")
    .max(20, "Name can be 20 charachters max"),
  email: z.email(),
  phone: z.string().regex(/^\+[1-9]\d{7,14}$/, "Invalid phone number"),
  address: z
    .string()
    .trim()
    .min(1, "Address at least must have 1 charachter")
    .max(100, "Address can be 100 charachters max"),
});

export const updateSupplierSchema = createSupplierSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least 1 field must be provided",
  );

export type CreateSupplier = z.infer<typeof createSupplierSchema>;
export type UpdateSupplier = z.infer<typeof updateSupplierSchema>;
