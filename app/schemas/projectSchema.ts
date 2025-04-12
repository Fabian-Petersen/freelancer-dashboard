import { z } from "zod";

export const projectSchema = z.object({
  client: z
    .string()
    .min(1, "client name is required")
    .max(15, "max 15 characters allowed"),
  name: z
    .string()
    .min(1, "project name is required")
    .max(15, "max 15 characters allowed"),
  description: z
    .string()
    .min(1, "description is required")
    .max(20, "max 20 characters allowed"),
  price: z.number().nonnegative("price must be 0 or more"),
  deadline: z.string().min(1, "deadline is required"),
  email: z
    .string()
    .min(1, "email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email format"),
  phone: z.string().min(1, "phone number is required"),
  status: z.number().int().nonnegative("status must be a non-negative integer"),
});
