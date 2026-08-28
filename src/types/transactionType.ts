import * as z from "zod";

export const createTransactionSchema = z.object({
  product_id: z.number(),
  type: z.enum(["IN", "OUT"]),
  quantity: z.number().positive(),
});

export type CreateTransaction = z.infer<typeof createTransactionSchema>;
