// ** Models or response types from api

import { z } from "zod";

export const loginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const userDetailsResponseSchema = z.object({
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(3, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  bio: z.string().nullable(),
  profilePic: z.string().nullable(),
  roles: z.array(z.object({ name: z.string() })),
  phone: z.string().nullable(),
});

export type UserDetailsResponse = z.infer<typeof userDetailsResponseSchema>;

export type UserDetailsUpdateRequest = Omit<
  z.infer<typeof userDetailsResponseSchema>,
  "roles"
>;
