type ReadingComics = {
  id: string;
};
type ComicType = "manga" | "manhwa" | "manhua";
type ComicStatus = "ongoing" | "finished" | "dropped";
export type User = {
  _id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;
  createdAt: string;
  readingComics: ReadingComics[];
};
export type UpdateUser = {
  name?: string;
  avatar?: string;
};
export type Comic = {
  imgCover: string;
  title: string;
  alternativeTitle: string;
  description: string;
  type: ComicType;
  genres: string[];
  status: ComicStatus;
  translateStatus: ComicStatus;
  author: string;
  artist: string;
  publishingCompany: string;
};
