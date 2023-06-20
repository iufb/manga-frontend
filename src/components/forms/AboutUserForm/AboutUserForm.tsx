"use client";

import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AboutUserFormProps } from "./AboutUserForm.props";
import { upload } from "@/services/uploads";
import { updateUser } from "@/services/user";
import { useSWRConfig } from "swr";
import { ImageInput } from "@/components/inputs/ImageInput/ImageInput";
import { ModalContainer } from "@/components/modals/ModalContainer/ModalContainer";
import { CropImageModal } from "@/components/modals/CropImageModal/CropImageModal";
import { useAlert } from "@/hooks/useAlert";
import { useAuth } from "@/hooks/useAuth";
import { ImagePreview } from "@/components/ImagePreview/ImagePreview";
import { ImageForm } from "../ImageForm/ImageForm";

export type createUserType = {
  name: string;
  avatar: File[];
};

export const AboutUserForm = ({ className, ...props }: AboutUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserType>();
  const [error, setError] = useState("");
  const { mutate } = useSWRConfig();
  const { user } = useAuth();
  const [image, setImage] = useState<File | Blob | null | undefined>(null);
  const { setAlert } = useAlert();
  const onSubmit: SubmitHandler<createUserType> = async (data) => {
    try {
      const imageUrl = await upload(image, "avatar");
      if (imageUrl) {
        updateUser({
          name: data.name,
          avatar: imageUrl.data.url,
        });
      }
      mutate("/user");
      setAlert("Profile information updated successfully", "success");
      setImage(undefined);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message);
      }
    }
  };
  const deleteAvatar = async () => {
    updateUser({ avatar: "" });
    mutate("/user");
  };
  return (
    <form
      className={`${className} w-full max-w-[900px]   col gap-4 mobile:px-4 tablet:px-10  desktop:tablet:px-20`}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ImageForm image={image} setImage={setImage} label="Avatar: " />
      <label className="input-group ">
        <span className="text-md mobile:text-sm text-indigoGrey">Name</span>
        <input
          className="input input-bordered  flex-1 mobile:pr-0"
          {...register("name")}
        />
      </label>
      {error && <p className=" text-red-600">{error}</p>}
      <button type="submit" className="btn ">
        Save
      </button>
    </form>
  );
};
