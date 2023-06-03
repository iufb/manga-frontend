"use client";
import { User } from "@/types/types";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
const LoginOrRegister = () => (
  <div className="flex gap-2 text-md">
    <Link href={"/login"}>Login </Link>
    or
    <Link href={"/register"}>Register</Link>
  </div>
);
const UserIcon = ({ icon, name }: { icon: string; name: string }) => (
  <Link
    href={{
      pathname: `/${name}`,
    }}
  >
    <Image
      src={icon ? `http://localhost:3000/${icon}` : "/user.jpg"}
      alt="Profile"
      width={35}
      height={40}
    />
  </Link>
);
export const AuthStatus = ({ user }: { user: User | null }) => {
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
          <UserIcon icon={user.avatar} name={user.email?.split("@")[0]} />
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
