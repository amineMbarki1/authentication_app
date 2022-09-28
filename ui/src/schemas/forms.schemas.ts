// ** All the schemas related form validation 
import zod from 'zod';


export const loginFormSchema = zod.object({
    email: zod.string().min(1, "Email is required").email("Invalid email"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
})

export type LoginRequest = zod.infer<typeof loginFormSchema>;

