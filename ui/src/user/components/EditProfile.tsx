import { FC } from "react";
import { useForm } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";

import useStore from "../../store";
import userService from "../../service/user.service";
import {
  updateUserFormSchema,
  UserUpdateRequest,
} from "../../schemas/forms.schemas";
import toast from "react-hot-toast";
import tokenService from "../../service/token.service";

type Props = {
  userDetails: UserUpdateRequest;
};

const EditProfile: FC<Props> = ({ userDetails }) => {
  const store = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdateRequest>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: userDetails,
  });

  const {
    data: updatedUser,
    mutate: updateUser,
    isLoading,
  } = useMutation(
    (userData: UserUpdateRequest) => userService.updateUser(userData),
    {
      onError(error: any) {
        if (error.response?.data) {
          Object.keys(error.response.data).forEach((key) =>
            toast.error(error.response.data[key])
          );
        } else toast.error(error.message);
      },
      onSuccess({ email }) {
        if (email) {
          store.logout();
          tokenService.clearSavedTokens();
        }

        toast.success("Yaay!!! User updated successfully");
      },
    }
  );

  const submitHandler = (values: UserUpdateRequest) => {
    Object.keys(values).forEach((key) => {
      const value = values[key as keyof UserUpdateRequest];
      if (!value) delete values[key as keyof UserUpdateRequest];
    });

    updateUser(values);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <h2>Change Info</h2>
      <p>Changes will be reflected to every sercices</p>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div
          style={{
            width: 150,
            height: 150,
            border: "solid 1px #eee",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background:
              "url(https://newsfeed.time.com/wp-content/uploads/sites/9/2010/10/homer.jpg?w=384)",
            backgroundSize: "contain",
            backgroundPosition: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.35)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AiFillCamera color="RGBA(255,255,255,.8)" size={35} />
          </div>
        </div>
        <label htmlFor="profile_pic">Change Photo</label>
      </div>
      <br />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        placeholder="Enter your first name"
        {...register("firstName")}
      />
      {errors.firstName && <small>{errors.firstName.message}</small>}
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        placeholder="Enter your last name"
        {...register("lastName")}
      />
      {errors.lastName && <small>{errors.lastName.message}</small>}
      <label htmlFor="bip">Bio</label>
      <textarea
        placeholder="Enter your bio here"
        id="bio"
        rows={5}
        {...register("bio")}
      ></textarea>
      {errors.bio && <small>{errors.bio.message}</small>}
      <label htmlFor="phone">Phone</label>
      <input
        type="text"
        id="phone"
        placeholder="Enter your phone number here"
        {...register("phone")}
      />
      {errors.phone && <small>{errors.phone.message}</small>}
      <label htmlFor="email">Email</label>
      <input type="email" id="email" {...register("email")} />
      {errors.email && <small>{errors.email.message}</small>}
      <label htmlFor="password">Password</label>
      <input type="password" id="password" {...register("password")} />
      {errors.password && <small>{errors.password.message}</small>}
      <button type="submit">{isLoading ? "Loading ..." : "SAVE"}</button>
    </form>
  );
};

export default EditProfile;
