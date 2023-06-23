"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddNewChapterFormProps } from "./AddNewChapterForm.props";
import { IChapter } from "@/types/types";
import { useEffect, useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { AxiosError } from "axios";
import { Input } from "@/components/inputs/Input/Input";
import { FileInput } from "@/components/inputs/FileInput/FileInput";
import { ImagePreview } from "@/components/ImagePreview/ImagePreview";
type newChapterForm = Omit<IChapter, "_id" | "pages" | "createdAt" | "comicId">;
export const AddNewChapterForm = ({
  className,
  ...props
}: AddNewChapterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newChapterForm>();
  const [pages, setPages] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();
  const onSubmit: SubmitHandler<newChapterForm> = async (data) => {
    try {
    } catch (e) {
      if (e instanceof AxiosError) {
        setAlert(e.response?.data.message, "error");
      }
    }
  };
  const setFiles = (files: string[]) => {
    setPages(files);
    setLoading(true);
  };
  useEffect(() => {
    if (pages) {
      setLoading(false);
    }
  }, [pages]);
  console.log(pages);
  console.log(loading);
  return (
    <form
      className={`${className}   w-full flex flex-col gap-4 h-full my-10`}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-2 w-full">
        <Input
          title="№"
          type="number"
          className="input-sm w-fit "
          {...register("chapterNumber", { required: true })}
        />
        <Input
          title="Chapter's name"
          {...register("name")}
          className="input-sm flex-1"
        />
        <button className="btn btn-sm ">Submit</button>
      </div>
      <div className="w-full min-h-[500px] h-full  bg-white center">
        {pages ? (
          loading ? (
            <div>loading</div>
          ) : (
            <div className="flex h-full flex-wrap">
              {pages.map((page) => (
                <ImagePreview src={page} key={page} width={100} height={150} />
              ))}
            </div>
          )
        ) : (
          <FileInput setFiles={setFiles} label="Select zip file with chapter" />
        )}
      </div>
    </form>
  );
};
