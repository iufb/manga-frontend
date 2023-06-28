import Link from "next/link";
import { TableOfContents } from "../TableOfContents/TableOfContents";
import { ReaderHeaderProps } from "./ReaderHeader.props";

export const ReaderHeader = ({
  className,
  chapter,
  ...props
}: ReaderHeaderProps): JSX.Element => {
  return (
    <div
      className={`${className} w-full h-14 flex center px-3 gap-3 bg-gray-700 text-customWhite py-2`}
      {...props}
    >
      <p>Sidebar icon</p>
      <Link href={`comic/${chapter.comicId}`} className="btn">
        {chapter.comicName && chapter?.comicName[0]}
      </Link>
      <TableOfContents chapterNumber={chapter.chapterNumber} />
      <div className="flex-1 flex justify-end">icons</div>
    </div>
  );
};
