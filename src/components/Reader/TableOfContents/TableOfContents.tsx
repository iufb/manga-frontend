import fetcher from "@/services/axios-client";
import { TableOfContentsProps } from "./TableOfContents.props";
import useSWR from "swr";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { IChapter } from "@/types/types";
export const TableOfContents = ({
  chapterNumber,
  className,
  ...props
}: TableOfContentsProps): JSX.Element => {
  const comicId = usePathname().split("/")[2];
  const chapterId = useSearchParams().get("chapterId");
  const { data: chapters } = useSWR<IChapter[]>(
    `chapter/byComic/${comicId}`,
    fetcher
  );
  const previousChapter = chapterNumber == 1 ? 1 : chapterNumber - 1;
  const nextChapter =
    chapters && chapterNumber == chapters.length ? null : chapterNumber + 1;
  console.log(chapterNumber);
  console.log(previousChapter);
  console.log(nextChapter);
  return (
    <div className={`${className} center gap-1`} {...props}>
      <Link
        className="btn btn-square btn-md center"
        href={`reader/${comicId}/c${previousChapter}?chapterId=${
          chapters && chapters[previousChapter - 1]._id
        }&page=1`}
      >
        <MdArrowBackIos />
      </Link>
      <button className="btn">Chapter {chapterNumber}</button>
      <Link
        className="btn btn-square btn-md"
        href={
          nextChapter
            ? `reader/${comicId}/c${nextChapter}?chapterId=${
                chapters && chapters[nextChapter - 1]?._id
              }&page=1`
            : `comic/${comicId}`
        }
      >
        <MdArrowForwardIos />
      </Link>
    </div>
  );
};
