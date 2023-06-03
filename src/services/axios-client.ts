import axios from "axios";
import Cookies from "js-cookie";
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    common: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    post: {
      "Content-Type": "application/json",
    },
  },
});

export default instance;
