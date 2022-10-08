import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

import { loginFormSchema, LoginRequest } from "../../schemas/forms.schemas";
import authService from "../../service/auth.service";
import useStore from "../../store";
import useRedirectIfAuthenticated from "../../shared/hooks/useRedirectIfAuthenticated";

const Login: FC = () => {
  useRedirectIfAuthenticated();
  const location = useLocation();
  const from: string =
    location.state?.from === undefined ? "/" : (location.state.from as string);

  const navigate = useNavigate();
  const store = useStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginRequest>({ resolver: zodResolver(loginFormSchema) });

  const { mutate: loginUser } = useMutation(
    (userData: LoginRequest) => authService.login(userData),
    {
      onMutate(varibales) {
        store.setRequestLoading(true);
      },
      onSuccess: () => {
        store.setRequestLoading(false);
        store.setIsAuthenticated(true);
        toast.success("You successfully logged in");
        navigate(from);
      },

      onError(error: any) {
        store.setRequestLoading(false);
        console.log(`${error.resposne?.status}`);

        if (`${error.response?.status}`.startsWith("4"))
          toast.error("Invalid Email or Password");
        else toast.error(`${error.message}`);
      },
    }
  );

  const submitHandler: SubmitHandler<LoginRequest> = (values) => {
    loginUser(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
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
        <button type="submit">
          {store.requestLoading ? "loading ..." : "Login"}
        </button>
        <p>
          Don't have an account ? <Link to="/register">Register</Link> instead
          😅
        </p>
        <Link to="/profile">Go to profile</Link>
      </form>
    </>
  );
};

export default Login;
