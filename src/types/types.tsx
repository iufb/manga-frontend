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
export interface IChapter {
  _id: string;
  comicId: string;
  comicName?: [string];
  chapterNumber: number;
  name?: string;
  pages: string[];
  createdAt: Date;
}
export interface ICreateChapter {
  comicId: string;
  chapterNumber: number;
  name?: string;
  pages: string[];
}
export interface IComic {
  _id: string;
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
