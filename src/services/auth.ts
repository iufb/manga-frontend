import { Form } from "@/components";
import axios from "axios";
import { instance } from "./axios-client";
export const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
});
export const registerUser = (data: Form) => {
  return instance.post("/auth/register", data);
};
export const loginUser = (data: Form) => {
  return instance.post("/auth/login", data);
};
