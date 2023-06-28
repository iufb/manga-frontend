import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface TableOfContentsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  chapterNumber: number;
}
