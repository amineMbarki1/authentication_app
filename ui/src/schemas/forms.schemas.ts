// ** All the schemas related to form validation
import zod, { z } from "zod";

export const loginFormSchema = zod.object({
  email: zod.string().min(1, "Email is required").email("Invalid email"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginRequest = zod.infer<typeof loginFormSchema>;

export const registerFormSchema = zod
  .object({
    firstName: zod.string().min(1, "First name is required"),
    lastName: zod.string().min(1, "Last name is required"),
    email: zod.string().min(1, "Email is required").email("Invalid email"),
    password: zod
      .string()
      .min(6, "Password must be at least 6 characters long"),
    passwordMatch: zod.string().min(1, "Plz confirm password"),
  })
  .refine(({ password, passwordMatch }) => password === passwordMatch, {
    message: "Passwords do not match",
    path: ["passwordMatch"],
  });

export const updateUserFormSchema = zod.object({
  firstName: z
    .string()
    .min(3, "First name must be between 3 and 10 characters long")
    .max(10, "First name must be between 3 and 10 characters long")
    .or(z.string().length(0))
    .optional()
    .nullable(),
  lastName: z
    .string()
    .min(3, "Last name must be between 3 and 10 characters long")
    .max(10, "Last name must be between 3 and 10 characters long")
    .or(z.string().length(0))
    .optional()
    .nullable(),
  email: z
    .string()
    .email("Invalid email")
    .or(z.string().length(0))
    .optional()
    .nullable(),
  bio: z
    .string()
    .min(3, "Bio must be between 3 and 25 characters long")
    .or(z.string().length(0))
    .optional()
    .nullable(),
  //TODO: profilePic: z.string().or(z.string().length(0)),
  phone: z.string().optional().nullable().or(z.string().length(0)),
  password: zod
    .string()
    .min(6, "Password must be at least 6 characters long")
    .or(z.string().length(0))
    .optional()
    .nullable(),
});
export type UserUpdateRequest = z.infer<typeof updateUserFormSchema>;

export type RegisterRequest = zod.infer<typeof registerFormSchema>;
