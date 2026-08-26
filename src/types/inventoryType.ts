import * as z from "zod";

export const inventoryId = z.object({
  id: z.coerce.number().int().positive().min(1),
});

export const createInventorySchema = z.object({
  product_id: z.int(),
  quantity: z.int().positive(),
  reserved: z.int().positive(),
  reorder_quantity: z.int().positive(),
});

export const updateInventorySchema = createInventorySchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "There must be at least 1 field provided",
  );

export type CreateInventory = z.infer<typeof createInventorySchema>;
export type UpdateInventory = z.infer<typeof updateInventorySchema>;
