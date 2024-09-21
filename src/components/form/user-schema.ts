import { z, ZodType } from "zod";
import { FormData } from "./types";

export const RegisterUserSchema: ZodType<FormData> = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required!")
      .regex(/^[a-zA-Z]+$/, "First name must contain only letters!"),
    lastName: z
      .string()
      .min(1, "Last name is required!")
      .regex(/^[a-zA-Z]+$/, "Last name must contain only letters!"),
    email: z.string().email("Invalid email format!"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters!")
      .max(30, "Password must be at most 30 characters!")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const LoginUserSchema: ZodType<FormData> = z.object({
  email: z.string().email("Invalid email format!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters!")
    .max(30, "Password must be at most 30 characters!")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const EditUserSchema: ZodType<FormData> = z.object({
  email: z
    .string()
    .email("Invalid email format!")
    .optional()
    .or(z.literal("").optional()), // Allow empty string,
  firstName: z
    .string()
    .regex(/^[a-zA-Z]+$/, "First name must contain only letters!")
    .optional()
    .or(z.literal("").optional()), // Allow empty string,
  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/, "Last name must contain only letters!")
    .optional()
    .or(z.literal("").optional()), // Allow empty string,
});
