"use client";

import { Input } from "@/components/inputs/Input/Input";
import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddNewComicFormProps } from "./AddNewComicForm.props";
import { ImageInput } from "@/components/inputs/ImageInput/ImageInput";
import { comicStatus, createNewComic } from "@/constants";
import { Select } from "@/components/Select/Select";
import { Comic, ComicForm } from "@/types/types";
import { MultiSelect } from "@/components/Select/MultiSelect/MultiSelect";

export const AddNewComicForm = ({
  className,
  ...props
}: AddNewComicFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Comic>();
  const [error, setError] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const onSubmit: SubmitHandler<Comic> = async (data) => {
    try {
      console.log(data);
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
      <ImageInput setImage={setImage} label="Comic Cover:" />
      {createNewComic.map(({ label }) => (
        <Input key={label} title={label} {...register(label as ComicForm)} />
      ))}

      <MultiSelect items={comicStatus} title="Genres" />
      <div className="flex gap-2 w-full ">
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
        <Select
          items={[""]}
          defaultValue="Select genres"
          {...register("genres")}
        />
      </div>
      <button type="submit" className="btn btn-sm w-20">
        Create
      </button>
    </form>
  );
};
