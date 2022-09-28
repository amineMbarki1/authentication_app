import { FC } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";

import { loginFormSchema, LoginRequest } from "../../schemas/forms.schemas";
import authService from "../../service/auth.service";


const Login: FC = () => {
    const { register, formState: { errors }, handleSubmit } = useForm<LoginRequest>({ resolver: zodResolver(loginFormSchema) });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const onSubmit = async (data: LoginRequest) => {
        setLoading(true);
        try {
            const response = await authService.login(data);
            console.log(response);
            
        } catch (error) {
            setError(error);
            console.error("hi this is my fucking error", error);
        } finally {
            setLoading(false);
        }
    }


    return <section>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email </label>
            <input {...register("email", { required: true })} id="email" name="email" type="email" placeholder="Email" />
            {errors.email && <small>{errors.email.message}</small>}
            <label htmlFor="password">Password </label>
            <input {...register("password", { required: true })} id="password" name="password" type="password" placeholder="Password" />
            {errors.password && <small>{errors.password.message}</small>}
            <br />
            <button type="submit">{loading ? "Loding ..." :"Login"}</button>
            <p>Don't have an account ? <a href="/register">Register</a> instead</p>
        </form>
    </section>
}

export default Login;