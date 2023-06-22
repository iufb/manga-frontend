import { ComicTabContentProps } from "./ComicTabContent.props";
import { Tabs } from "@/components/Tabs/Tabs";
import { Tag } from "@/components/Tag/Tag";
import { getChapterByComic } from "@/services/chapter";
import { IChapter } from "@/types/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
const tabs = ["Information", "Chapters"];
export const ComicTabContent = ({
  description,
  genres,
  id,
  className,
  ...props
}: ComicTabContentProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [chapters, setChapters] = useState<IChapter[] | null>(null);
  const [showMoreText, setShowMoreText] = useState<boolean>(false);
  const isLargeText = description.length > 350;
  const changeTab = (tab: string) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    getChapterByComic(id)
      .then(({ data }) => {
        setChapters(data);
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          if (e.code == "404") {
            setChapters([]);
          }
        }
      });
  }, [id]);
  return (
    <div
      className={`${className} w-full rounded-md bg-white flex flex-col gap-4 p-4 h-fit mt-4`}
      {...props}
    >
      <Tabs tabs={tabs} changeTab={changeTab} activeTab={activeTab} />
      {activeTab == "Information" && (
        <div className="flex flex-col gap-4">
          <p>
            {showMoreText || !isLargeText
              ? description
              : `${description.substring(0, 350)}...`}
            {isLargeText && (
              <button
                className="text-indigoGrey font-bold ml-2"
                onClick={() => setShowMoreText((prev) => !prev)}
              >
                {showMoreText ? "Show less" : "Show more"}
              </button>
            )}
          </p>
          <div className="flex gap-3 flex-wrap ">
            {genres.map((genre) => (
              <Tag name={genre} key={genre} />
            ))}
          </div>
        </div>
      )}
      {chapters && chapters.length == 0 ? (
        <div>Chapters not found.</div>
      ) : (
        activeTab == "Chapters" &&
        chapters && (
          <div className="flex flex-col gap-2 px-3">
            {chapters.map((chapter) => (
              <div key={chapter._id} className="flex gap-2">
                <span className="">Chapter {chapter.chapterNumber}.</span>
                <span>{chapter.name}</span>
                <span className="flex-1 text-end">
                  {new Date(chapter.createdAt)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .toString()}
                </span>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
