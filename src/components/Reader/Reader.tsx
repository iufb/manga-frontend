"use client";
import fetcher from "@/services/axios-client";
import { ReaderProps } from "./Reader.props";
import { ReaderHeader } from "./ReaderHeader/ReaderHeader";
import useSWR from "swr";
import { IChapter } from "@/types/types";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ImagePreview } from "../ImagePreview/ImagePreview";
import { useGetImageResolution } from "@/hooks/useGetImageResolution";
import { useState } from "react";
export const Reader = ({ className, ...props }: ReaderProps): JSX.Element => {
  const id = useSearchParams().get("chapterId");
  const { data: chapter } = useSWR<IChapter>(`/chapter/${id}`, fetcher);
  const resolution = useGetImageResolution(
    `http://localhost:3000/${chapter?.pages[Number(currentPage)]}`
  );
  return (
    <div className={`${className}`} {...props}>
      {chapter && <ReaderHeader chapter={chapter} />}
      <main className=" mx-auto max-h-full  h-full min-h-screen   bg-gray-800 center w-full ">
        {chapter && (
          <ImagePreview
            src={chapter.pages[Number(currentPage)]}
            width={resolution.width}
            height={resolution.height}
          />
        )}
      </main>
    </div>
  );
};
