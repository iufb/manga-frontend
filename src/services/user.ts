import { UpdateUser } from "@/types/types";
import { instance } from "./axios-client";

export const getUser = () => {
  return instance.get("/user");
};

export const updateUser = (data: UpdateUser) => {
  return instance.patch("/user", data);
};
