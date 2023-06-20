import Image from "next/image";
import { ComicSidebarProps } from "./ComicSidebar.props";
import { ImagePreview } from "@/components/ImagePreview/ImagePreview";

export const ComicSidebar = ({
  className,
  comic,
  ...props
}: ComicSidebarProps): JSX.Element => {
  return <div className={`${className} `} {...props}></div>;
};
