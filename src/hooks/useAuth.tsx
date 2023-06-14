"use client";

import fetcher from "@/services/axios-client";
import { User } from "@/types/types";
import useSWR from "swr";
export const useAuth = () => {
  const { data: user } = useSWR<User>("/user", fetcher);
  return { user };
};
