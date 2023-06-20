import axios from "axios";
import Cookies from "js-cookie";
export const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    common: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "application/json",
    },
  },
});

const fetcher = (url: string) => instance.get(url).then((res) => res.data);
export default fetcher;
