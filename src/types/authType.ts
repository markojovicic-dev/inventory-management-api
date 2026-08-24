import * as z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .trim()
    .min(8, "Password has to be at least 8 carachters")
    .max(32, "Password must have 32 charachters max"),
});

export type Role = "admin" | "user";

export type LoginSchema = z.infer<typeof loginSchema>;
