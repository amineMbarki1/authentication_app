// ** All the schemas related form validation 
import zod from 'zod';


export const loginFormSchema = zod.object({
    email: zod.string().min(1, "Email is required").email("Invalid email"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
})

export type LoginRequest = zod.infer<typeof loginFormSchema>;


export const registerFormSchema = zod.object({
    firstName: zod.string().min(1, "First name is required"),
    lastName: zod.string().min(1, "Last name is required"),
    email: zod.string().min(1, "Email is required").email("Invalid email"),
    password: zod.string().min(6, "Password must be at least 6 characters long") ,
    passwordMatch: zod.string().min(1, "Plz confirm password")

}).refine(({password, passwordMatch}) => password === passwordMatch, {message: "Passwords do not match", path: ["matchPassword"]}  );

export type RegisterRequest = zod.infer<typeof registerFormSchema>;

