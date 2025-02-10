import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, {
      message: "Email minimum length is 3 characters",
    })
    .email({
      message: "Invalid email address",
    })
    .max(30, {
      message: "Email maximum length is 30 characters",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password minimum length is 8 characters",
    })
    .max(30, {
      message: "Password maximum length is 30 characters",
    }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(3, {
        message: "First name minimum length is 3 characters",
      })
      .max(30, {
        message: "First name maximum length is 30 characters",
      }),
    lastName: z
      .string()
      .min(3, {
        message: "Last name minimum length is 3 characters",
      })
      .max(30, {
        message: "Last name maximum length is 30 characters",
      }),
    email: z
      .string()
      .min(3, {
        message: "Email minimum length is 3 characters",
      })
      .email({
        message: "Invalid email address",
      })
      .max(30, {
        message: "Email maximum length is 30 characters",
      }),
    password: z
      .string()
      .min(8, {
        message: "Password minimum length is 8 characters",
      })
      .max(30, {
        message: "Password maximum length is 30 characters",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password minimum length is 8 characters",
      })
      .max(30, {
        message: "Password maximum length is 30 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(3, {
      message: "Email minimum length is 3 characters",
    })
    .email({
      message: "Invalid email address",
    })
    .max(30, {
      message: "Email maximum length is 30 characters",
    }),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const searchProductSchema = z.object({
  query: z.string().max(30, {
    message: "Query maximum length is 30 characters",
  }),
  category: z.string().max(30, {
    message: "Category maximum length is 30 characters",
  }),
  sortBy: z
    .string()
    .min(1, {
      message: "Sort by minimum length is 3 character",
    })
    .max(30, {
      message: "Sort by maximum length is 30 characters",
    }),
  order: z
    .string()
    .min(1, {
      message: "Order minimum length is 3 character",
    })
    .max(30, {
      message: "Order maximum length is 30 characters",
    }),
});

export type SearchProductSchema = z.infer<typeof searchProductSchema>;
