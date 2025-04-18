import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
    "Password must include uppercase, lowercase, number, and special character"
  );

export const registerSchema = z
  .object({
    name: z.string().min(1, "Please provide your name"),
    email: z
      .string()
      .min(1, "email is required")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email format"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const confirmSignUpSchema = z.object({
  code: z
    .string()
    .min(1, "Please provide a valid code")
    .max(6, "The code must be 6 characters long"),
});

export const resendCodeSchema = z.object({
  email: z
    .string()
    .min(1, "email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email format"),
});
