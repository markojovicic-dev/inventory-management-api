import * as z from "zod";

export const userIdSchema = z.object({
  id: z.coerce.number().int().positive().min(1),
});

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name must have at least 1 charachter")
    .max(100, "Name can not have more then 100 charachters"),
  last_name: z
    .string()
    .trim()
    .min(1, "Last name must have at least 1 charachter")
    .max(100, "Last name can not have more then 100 charachters"),
  email: z.email(),
  password: z
    .string()
    .trim()
    .min(8, "Password has to be at least 8 charachters")
    .max(32, "Password can not be longer then 32 charachters"),
});

export const updateUserSchema = createUserSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
