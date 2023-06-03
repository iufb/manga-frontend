export type ReadingComics = {
  id: string;
};

export type User = {
  _id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;
  createdAt: string;
  readingComics: ReadingComics[];
};
