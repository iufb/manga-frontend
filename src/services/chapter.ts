import { instance } from "./axios-client";

export const getChapterByComic = (id: string) => {
  return instance.get(`chapter/byComic/${id}`);
};
