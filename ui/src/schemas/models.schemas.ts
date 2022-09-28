
// ** Models or response types from api

import { z } from "zod";


export const loginResponseSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string()
});

export type LoginResponse = z.infer<typeof loginResponseSchema>