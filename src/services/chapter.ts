import { ICreateChapter } from "@/types/types";
import { instance } from "./axios-client";

export const getChapterByComic = (id: string) => {
  return instance.get(`chapter/byComic/${id}`);
};
export const createChapter = (chapter: ICreateChapter) => {
  return instance.post(`chapter/create`, chapter);
};
