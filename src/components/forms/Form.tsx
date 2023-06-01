"use client";
import { loginUser, registerUser } from "@/services/auth";
import { FormProps } from "./Form.props";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useState } from "react";
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
      console.log(response.data);
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
      <label className="input-group ">
        <span className="text-md mobile:text-sm text-indigoGrey">Email</span>
        <input
          type="email"
          className="input input-bordered  flex-1 mobile:pr-0"
          {...register("login", { required: true })}
        />
      </label>
      <label className="input-group w-full">
        <span className="text-md mobile:text-sm text-indigoGrey">Password</span>
        <input
          type="password"
          className="input input-bordered w-full mobile:pr-0"
          {...register("password", { required: true, min: 6 })}
        />
      </label>
      {error && <p className=" text-red-600">{error}</p>}
      <button type="submit" className="btn ">
        {type}
      </button>
    </form>
  );
};
