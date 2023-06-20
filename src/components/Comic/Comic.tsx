"use client";
import { useEffect, useState } from "react";
import { ComicProps } from "./Comic.props";
import { ComicSidebar } from "./ComicSidebar/ComicSidebar";
import { IComic } from "@/types/types";
import { usePathname, useSearchParams } from "next/navigation";
import { getComic } from "@/services/comic";

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
    <div className={`${className}`} {...props}>
      <ComicSidebar comic={comic} />
    </div>
  );
};
