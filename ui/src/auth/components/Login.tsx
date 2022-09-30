import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { loginFormSchema, LoginRequest } from "../../schemas/forms.schemas";
import authService from "../../service/auth.service";
import { AxiosError } from "axios";
import { ZodError } from "zod";

const Login: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginRequest>({ resolver: zodResolver(loginFormSchema) });

  const [loading, setLoading] = useState<boolean>(false);
  // TODO : Change error type (AxiosError, ZodError)
  const [error, setError] = useState<AxiosError | ZodError | null>(null);

  useEffect(() => {
    if (error) toast.error(error.message + " 😥");
  }, [error]);

  const onSubmit = async (data: LoginRequest) => {
    setLoading(true);
    try {
      const response = await authService.login(data);
      console.log(response);
    } catch (error: any) {
      setError(error);
      console.error("hi this is my error baby", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Login 😅</h4>
        <label htmlFor="email">Email </label>
        <input
          {...register("email", { required: true })}
          id="email"
          name="email"
          type="email"
          placeholder="Email"
        />
        {errors.email && <small>{errors.email.message}</small>}
        <label htmlFor="password">Password </label>
        <input
          {...register("password", { required: true })}
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        {errors.password && <small>{errors.password.message}</small>}
        <br />
        <button type="submit">{loading ? "Loding ..." : "Login"}</button>
        <p>
          Don't have an account ? <Link to="/register">Register</Link> instead
          😅
        </p>
        npm install react-hot-toast
      </form>
    </>
  );
};

export default Login;
