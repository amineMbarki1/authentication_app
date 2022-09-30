import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import {
  registerFormSchema,
  RegisterRequest,
} from "../../schemas/forms.schemas";
import authService from "../../service/auth.service";

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({ resolver: zodResolver(registerFormSchema) });

  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: RegisterRequest) => {
    try {
      setLoading(true);
      // console.log(data);
      const response = await authService.register(data);
      console.log(response);

      toast.success("Your account has been registered 😉");
    } catch (error) {
      console.error("hi this is my error", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) toast.error(error.message + " 😥");
  }, [error]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Register 😅</h4>
        <label htmlFor="firstName">First Name</label>
        <input
          {...register("firstName")}
          type="text"
          placeholder="First Name ..."
          id="firstName"
        />
        {errors.firstName && <small>{errors.firstName.message}</small>}

        <label htmlFor="lastName">Last Name</label>
        <input
          {...register("lastName")}
          type="text"
          id="lastName"
          placeholder="Last Name ..."
        />
        {errors.lastName && <small>{errors.lastName.message}</small>}

        <label htmlFor="emil">Email</label>
        <input {...register("email")} type="email" id="email" />
        {errors.email && <small>{errors.email.message}</small>}

        <label htmlFor="password">Password</label>
        <input {...register("password")} type="password" id="password" />
        {errors.password && <small>{errors.password.message}</small>}

        <label htmlFor="passwordMatch">Confirm password</label>
        <input
          {...register("passwordMatch")}
          type="password"
          id="matchPassword"
        />
        {errors.passwordMatch && <small>{errors.passwordMatch.message}</small>}
        <br />
        <button type="submit">{loading && "loading ... "}Register</button>
        <p>
          Already have an account ? <Link to="/login">Login</Link> instead 😅
        </p>
      </form>
    </>
  );
};

export default Register;
