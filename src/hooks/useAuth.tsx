"use client";

import { getUser } from "@/services/user";
import { User } from "@/types/types";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUser().then(({ data }) => {
      setUser(data);
    });
  }, []);
  return { user, setUser };
};
