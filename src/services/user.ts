import instance from "./axios-client";

export const getUser = () => {
  return instance.get("/user");
};
