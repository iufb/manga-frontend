"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaSearchPlus } from "react-icons/fa";
import { AddNewChapterFormProps } from "./AddNewChapterForm.props";
import { IChapter } from "@/types/types";
import { useEffect, useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { AxiosError } from "axios";
import { Input } from "@/components/inputs/Input/Input";
import { FileInput } from "@/components/inputs/FileInput/FileInput";
import { ImagePreview } from "@/components/ImagePreview/ImagePreview";
import Link from "next/link";
import { ModalContainer } from "@/components/modals/ModalContainer/ModalContainer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { createChapter } from "@/services/chapter";
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
  const [selectedPage, setSelectedPage] = useState(0);
  const id = usePathname().split("/")[2];
  const router = useRouter();
  const [expandImage, setExpandImage] = useState(false);
  const { setAlert } = useAlert();
  const onSubmit: SubmitHandler<newChapterForm> = async (data) => {
    try {
      console.log(typeof data.chapterNumber);
      if (pages)
        createChapter({
          name: data.name,
          chapterNumber: Number(data.chapterNumber),
          comicId: id,
          pages,
        })
          .then(() => {
            console.log({ ...data, comicId: id, pages });
            router.push(`/comic/${id}`);
          })
          .catch((e) => {
            if (e instanceof AxiosError) {
              setAlert(e.response?.data.message, "error");
            }
          });
    } catch (e) {
      if (e instanceof AxiosError) {
        setAlert(e.response?.data.message, "error");
      }
    }
  };
  const setFiles = (files: string[]) => {
    setPages(files);
  };
  return (
    <>
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
          <button className="btn btn-sm " type="submit">
            Submit
          </button>
        </div>
        <div className="w-full min-h-[500px] h-full  bg-white center p-2">
          {pages ? (
            <div className="flex h-full flex-wrap gap-2 justify-center ">
              {pages.map((page, idx) => (
                <ImagePreview
                  src={page}
                  key={page}
                  width={100}
                  height={150}
                  className=" border-4 rounded-md border-gray-400 p-2"
                >
                  <button
                    type="button"
                    className="absolute bottom-1 p-1 right-1 bg-indigoGrey rounded-md text-white"
                    onClick={() => {
                      setSelectedPage(idx + 1);
                      setExpandImage(true);
                    }}
                  >
                    <FaSearchPlus />
                  </button>
                </ImagePreview>
              ))}
            </div>
          ) : (
            <FileInput
              setFiles={setFiles}
              label="Select zip file with chapter"
            />
          )}
        </div>
      </form>
      {expandImage && pages && (
        <ModalContainer>
          <ImagePreview src={pages[selectedPage]} width={500} height={600}>
            <button
              onClick={() => setExpandImage(false)}
              className="absolute top-1 right-1 p-2 bg-indigoGrey bg-opacity-50 hover:bg-opacity-100 text-white "
            >
              <AiOutlineClose />
            </button>
          </ImagePreview>
        </ModalContainer>
      )}
    </>
  );
};
