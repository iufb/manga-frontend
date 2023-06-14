"use client";
import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { UserIcon } from "../UserIcon/UserIcon";
const LoginOrRegister = () => (
  <div className="flex gap-2 text-md">
    <Link href={"/login"}>Login </Link>
    or
    <Link href={"/register"}>Register</Link>
  </div>
);
export const AuthStatus = () => {
  const { user } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(Cookies.get("token") ?? null);
  }, [token]);
  const logout = () => {
    setToken(null);
    Cookies.remove("token");
  };
  return (
    <div className="ml-10">
      {token && user ? (
        <div className=" gap-2 center w-[100px]  ">
          <Link href={`/${user.email?.split("@")[0]}`}>
            <UserIcon avatar={user.avatar} width={35} height={40} />
          </Link>
          <button
            className="btn btn-square btn-sm bg-lightGrey text-indigoGrey border-none"
            onClick={logout}
          >
            <FiLogOut />
          </button>
        </div>
      ) : (
        <LoginOrRegister />
      )}
    </div>
  );
};
