import { IChapter } from "@/types/types";
import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface ReaderHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  chapter: IChapter;
}
