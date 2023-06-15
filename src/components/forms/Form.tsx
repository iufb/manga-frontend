"use client";
import { loginUser, registerUser } from "@/services/auth";
import { FormProps } from "./Form.props";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { Input } from "../inputs/Input/Input";
export type Form = {
  login: string;
  password: string;
};
export const Form = ({ className, type, ...props }: FormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  const [error, setError] = useState("");
  const router = useRouter();
  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      const response =
        type === "register" ? await registerUser(data) : await loginUser(data);
      if (response.data.access_token) {
        Cookies.set("token", response.data.access_token);
      }
      setError("");
      router.push("/");
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message);
      }
    }
  };
  return (
    <form
      className={`${className} w-full col gap-4 mobile:px-4 tablet:px-10  desktop:tablet:px-20`}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="email"
        title="Email"
        {...register("login", { required: true })}
      />
      <Input
        type="password"
        title="Password"
        {...register("password", { required: true, min: 6 })}
      />
      {error && <p className=" text-red-600">{error}</p>}
      <button type="submit" className="btn ">
        {type}
      </button>
    </form>
  );
};
