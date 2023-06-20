import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface ImagePreviewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  width: number;
  height: number;
  src: string | undefined;
  deleteImage?: () => void;
  local?: boolean;
}
