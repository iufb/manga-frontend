import { Form } from "@/components";
import axios from "axios";
export const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
});
export const registerUser = (data: Form) => {
  return axiosClient.post("/auth/register", data);
};
export const loginUser = (data: Form) => {
  return axiosClient.post("/auth/login", data);
};
