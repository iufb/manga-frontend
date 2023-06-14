import { instance } from "./axios-client";

export const uploadAvatar = (file: Blob | undefined) => {
  if (!file) return null;
  const filename = Math.floor(Math.random() * 100).toString();
  const form = new FormData();
  form.append("file", file, filename);
  return instance.post("/files/upload/avatar", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
