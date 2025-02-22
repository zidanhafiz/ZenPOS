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

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name minimum length is 3 characters",
    })
    .max(30, {
      message: "Name maximum length is 30 characters",
    }),
  description: z
    .string()
    .min(3, {
      message: "Description minimum length is 3 characters",
    })
    .max(100, {
      message: "Description maximum length is 100 characters",
    }),
  price: z
    .number()
    .min(1, {
      message: "Price minimum length is 1 characters",
    })
    .max(1000000000, {
      message: "Price maximum length is 1000000000 characters",
    }),
  stock: z.number().max(1000000000, {
    message: "Stock maximum length is 1000000000 characters",
  }),
  category: z
    .string()
    .min(3, {
      message: "Category minimum length is 3 characters",
    })
    .max(100, {
      message: "Category maximum length is 100 characters",
    }),
});

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name minimum length is 3 characters",
    })
    .max(30, {
      message: "Name maximum length is 30 characters",
    }),
  description: z
    .string()
    .min(3, {
      message: "Description minimum length is 3 characters",
    })
    .max(100, {
      message: "Description maximum length is 100 characters",
    }),
  price: z
    .number()
    .min(1, {
      message: "Price minimum length is 1 characters",
    })
    .max(1000000000, {
      message: "Price maximum length is 1000000000 characters",
    }),
  stock: z
    .number()
    .min(1, {
      message: "Stock minimum length is 1 characters",
    })
    .max(1000000000, {
      message: "Stock maximum length is 1000000000 characters",
    }),
  category: z
    .string()
    .min(3, {
      message: "Category minimum length is 3 characters",
    })
    .max(100, {
      message: "Category maximum length is 100 characters",
    }),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export const editAccountSchema = z.object({
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
    .email({
      message: "Invalid email address",
    })
    .max(30, {
      message: "Email maximum length is 30 characters",
    }),
});

export type EditAccountSchema = z.infer<typeof editAccountSchema>;

export const updateUserPasswordSchema = z
  .object({
    newPassword: z
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
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>;
