"use client";

import { Input } from "@/components/inputs/Input/Input";
import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddNewComicFormProps } from "./AddNewComicForm.props";
import { comicStatus, comicTypes, createNewComic, genres } from "@/constants";
import { Select } from "@/components/Select/Select";
import { IComic } from "@/types/types";
import { MultiSelect } from "@/components/Select/MultiSelect/MultiSelect";
import { upload } from "@/services/uploads";
import { createComic } from "@/services/comic";
import { useAlert } from "@/hooks/useAlert";
import { useRouter } from "next/navigation";
import { ImageForm } from "../ImageForm/ImageForm";
type newComicForm = Omit<IComic, "imgCover" | "genres">;
export const AddNewComicForm = ({
  className,
  ...props
}: AddNewComicFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newComicForm>();
  const [comicCover, setComicCover] = useState<File | null | Blob | undefined>(
    null
  );
  const [comicBg, setComicBg] = useState<File | null | Blob | undefined>(null);
  const router = useRouter();
  console.log(comicCover, comicBg);
  const { setAlert } = useAlert();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const onSubmit: SubmitHandler<newComicForm> = async (data) => {
    try {
      const uploadedImage = await upload({
        type: "comic",
        file: comicCover,
        secondFile: comicBg,
        params: {
          comicName: data.title.replace(" ", ""),
        },
      });
      if (uploadedImage) {
        const comic = await createComic({
          ...data,
          genres: selectedGenres,
          comicCover: uploadedImage.data.comicCover,
          comicBg: uploadedImage.data.comicBg,
        });
        router.push(`/comic/${comic.data._id}`);
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setAlert(e.response?.data.message, "error");
      }
    }
  };
  return (
    <form
      className={`${className} w-full col gap-4 mobile:px-4 tablet:px-10  desktop:tablet:px-20`}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ImageForm
        imageFor="default"
        image={comicCover}
        setImage={setComicCover}
        label="Comic cover:"
      />
      <ImageForm
        imageFor="bg"
        image={comicBg}
        setImage={setComicBg}
        label="Comic background:"
      />
      {createNewComic.map(({ label, registerProp }) => (
        <Input
          key={label}
          title={label}
          {...register(registerProp, { required: true })}
        />
      ))}

      <MultiSelect
        items={genres}
        title="Genres"
        state={selectedGenres}
        setState={setSelectedGenres}
      />
      <div className="flex gap-2 w-full ">
        <Select
          items={comicTypes}
          defaultValue="Select title type"
          {...register("type")}
        />
        <Select
          items={comicStatus}
          defaultValue="Select title status"
          {...register("status")}
        />

        <Select
          items={comicStatus}
          defaultValue="Select translate status"
          {...register("translateStatus")}
        />
      </div>
      <button type="submit" className="btn btn-sm w-20">
        Create
      </button>
    </form>
  );
};
