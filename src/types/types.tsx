type ReadingComics = {
  id: string;
};
export type ComicType = "manga" | "manhwa" | "manhua";
export type ComicStatus = "ongoing" | "finished" | "dropped";
export type ComicForm =
  | "title"
  | "alternativeTitle"
  | "description"
  | "type"
  | "status"
  | "translateStatus"
  | "author"
  | "artist"
  | "publishingCompany";
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
export interface IComic {
  comicCover: string;
  comicBg: string;
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
}
