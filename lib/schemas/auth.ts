import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(3, { message: "Email must be at least 3 characters" }).max(30, { message: "Email must be less than 30 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(20, { message: "Password must be less than 20 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }).max(20, { message: "First name must be less than 20 characters" }),
    lastName: z.string().max(20, { message: "Last name must be less than 20 characters" }).default(""),
    phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }).max(15, { message: "Phone number must be less than 15 characters" }),
    email: z.string().email().min(3, { message: "Email must be at least 3 characters" }).max(30, { message: "Email must be less than 30 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(20, { message: "Password must be less than 20 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters" })
      .max(20, { message: "Confirm password must be less than 20 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
