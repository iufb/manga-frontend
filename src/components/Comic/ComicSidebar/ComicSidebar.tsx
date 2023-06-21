import { ComicSidebarProps } from "./ComicSidebar.props";
import { ImagePreview } from "@/components/ImagePreview/ImagePreview";
import { ComicInfo } from "../ComicInfo/ComicInfo";
export const ComicSidebar = ({
  className,
  comic,
  ...props
}: ComicSidebarProps): JSX.Element => {
  return (
    <div className={`${className} flex flex-col gap-4`} {...props}>
      <ImagePreview src={comic?.comicCover} width={250} height={337} />
      <ComicInfo comic={comic} />
    </div>
  );
};
