"use client";
import { useEffect, useState } from "react";
import { ComicProps } from "./Comic.props";
import { ComicSidebar } from "./ComicSidebar/ComicSidebar";
import { IComic } from "@/types/types";
import { usePathname } from "next/navigation";
import { getComic } from "@/services/comic";
import { ComicContent } from "./ComicContent/ComicContent";

export const Comic = ({ className, ...props }: ComicProps): JSX.Element => {
  const [comic, setComic] = useState<IComic | null>(null);
  const path = usePathname();
  useEffect(() => {
    const id = path.split("/")[2];
    getComic(id).then(({ data }) => {
      setComic(data);
    });
  }, [path]);
  return (
    <div className={`${className} `} {...props}>
      <div
        className="w-full h-[350px] relative before:absolute before:w-full before:h-full before:bg-gray-600 before:bg-opacity-70   "
        style={{
          backgroundImage: `url(http://localhost:3000/${comic?.comicBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="mx-auto max-w-[1320px] -mt-20 flex gap-10  ">
        <ComicSidebar comic={comic} />
        <ComicContent comic={comic} />
      </div>
    </div>
  );
};
