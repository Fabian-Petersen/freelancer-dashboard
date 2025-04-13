import { z } from "zod";

export const projectSchema = z.object({
  client: z
    .string()
    .min(1, "client name is required")
    .max(25, "max 25 characters allowed"),
  name: z
    .string()
    .min(1, "project name is required")
    .max(25, "max 25 characters allowed"),
  id: z.string().optional(),
  description: z
    .string()
    .min(1, "description is required")
    .max(20, "max 20 characters allowed"),
  price: z.coerce
    .number()
    .nonnegative("price must be 0 or more")
    .max(999999, "max number of 6 character"),
  deadline: z.coerce
    .date({
      errorMap: () => ({
        message: "Deadline is required and must be a valid date",
      }),
    })
    .refine((date) => date > new Date(), {
      message: "Deadline must be a future date",
    }),
  email: z
    .string()
    .min(1, "email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email format"),
  phone: z.string().min(1, "phone number is required"),
  status: z.coerce
    .number()
    .int()
    .nonnegative("status must be a non-negative integer"),
});
