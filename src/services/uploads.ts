import { instance } from "./axios-client";

export const upload = (
  file: Blob | undefined | File | null,
  type: string,
  params?: Record<string, unknown>
) => {
  if (!file) return null;
  const filename = Math.floor(Math.random() * 100).toString();
  const form = new FormData();
  form.append("file", file, filename);
  return instance.post(`/files/upload/${type}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params,
  });
};
