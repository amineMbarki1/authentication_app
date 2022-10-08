import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";

import {
  registerFormSchema,
  RegisterRequest,
} from "../../schemas/forms.schemas";
import authService from "../../service/auth.service";
import useStore from "../../store";
import useRedirectIfAuthenticated from "../../shared/hooks/useRedirectIfAuthenticated";

const Register: FC = () => {
  useRedirectIfAuthenticated();
  const store = useStore();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({ resolver: zodResolver(registerFormSchema) });

  const { mutate: registerUser } = useMutation(
    (userData: RegisterRequest) => authService.register(userData),
    {
      onMutate(variables) {
        store.setRequestLoading(true);
      },
      onSuccess() {
        reset();
        toast.success("User Created successfully :)");
        store.setRequestLoading(false);
      },
      onError(error: any) {
        console.log("error baby");
        store.setRequestLoading(false);

        if (error.response.data) {
          Object.keys(error.response.data).forEach((errorKey) => {
            toast.error(error.response.data[errorKey]);
          });
        } else toast.error(error.message);
      },
    }
  );

  const submitHandler: SubmitHandler<RegisterRequest> = (values) => {
    registerUser(values);
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
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
          id="passwordMatch"
        />
        {errors.passwordMatch && <small>{errors.passwordMatch.message}</small>}
        <br />
        <button type="submit">
          {store.requestLoading ? "Loading" : "Register"}
        </button>
        <p>
          Already have an account ? <Link to="/login">Login</Link> instead 😅
        </p>
      </form>
    </>
  );
};

export default Register;
