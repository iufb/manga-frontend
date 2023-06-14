"use client";

import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AboutUserFormProps } from "./AboutUserForm.props";
import { uploadAvatar } from "@/services/uploads";
import { updateUser } from "@/services/user";
import { useSWRConfig } from "swr";
import { ImageInput } from "@/components/inputs/ImageInput/ImageInput";
import { ModalContainer } from "@/components/modals/ModalContainer/ModalContainer";
import { CropImageModal } from "@/components/modals/CropImageModal/CropImageModal";
import { useAlert } from "@/hooks/useAlert";
import { UserIcon } from "@/components/UserIcon/UserIcon";
import { useAuth } from "@/hooks/useAuth";
import { AiOutlineDelete } from "react-icons/ai";

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
  const [image, setImage] = useState<File | null>(null);
  const [cropImage, setCropImage] = useState<Blob>();
  const { setAlert } = useAlert();
  const onSubmit: SubmitHandler<createUserType> = async (data) => {
    try {
      const imageUrl = await uploadAvatar(cropImage);
      if (imageUrl) {
        updateUser({
          name: data.name,
          avatar: imageUrl.data.url,
        });
      }
      mutate("/user");
      setAlert("Profile information updated successfully", "success");
      setCropImage(undefined);
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        if (typeof e.target?.result == "string") img.src = e.target?.result;
        img.onload = () => {
          const { height, width } = img;
          if (height > 500 || width > 500) {
            setImage(null);
            setAlert("Height and Width must not exceed 500px.", "error");
            return false;
          } else {
            setImage(file);
          }
        };
      };
    }
  };
  return (
    <form
      className={`${className} w-full max-w-[900px]   col gap-4 mobile:px-4 tablet:px-10  desktop:tablet:px-20`}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl ">Avatar</h2>
      <div className="flex gap-3 ">
        <ImageInput onChange={handleChange} />
        <div className="w-28 h-28 border border-dotted border-gray-400 center relative">
          <UserIcon avatar={user?.avatar} width={90} height={90} />
          <button
            className={`btn  btn-square btn-sm ${
              !user?.avatar && "hidden"
            }    bg-opacity-90 absolute top-0 left-0 `}
            onClick={deleteAvatar}
          >
            <AiOutlineDelete />
          </button>
        </div>
      </div>
      <label className="input-group ">
        <span className="text-md mobile:text-sm text-indigoGrey">Name</span>
        <input
          className="input input-bordered  flex-1 mobile:pr-0"
          {...register("name")}
        />
      </label>
      {error && <p className=" text-red-600">{error}</p>}
      {image && (
        <ModalContainer>
          <CropImageModal
            image={image}
            setCropImage={setCropImage}
            setImage={setImage}
          />
        </ModalContainer>
      )}
      <button type="submit" className="btn ">
        Save
      </button>
    </form>
  );
};
