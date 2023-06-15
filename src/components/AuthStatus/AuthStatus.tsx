"use client";
import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { UserIcon } from "../UserIcon/UserIcon";
import { useModal } from "@/hooks/useModal";
import { modalStatusType } from "@/context/ModalContext";
import { UserMenuModal } from "../modals/UserMenuModal/UserMenuModal";
const LoginOrRegister = () => (
  <div className="flex gap-2 text-md">
    <Link href={"/login"}>Login </Link>
    or
    <Link href={"/register"}>Register</Link>
  </div>
);
export const AuthStatus = () => {
  const { user } = useAuth();
  const { setModal } = useModal();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(Cookies.get("token") ?? null);
  }, [token]);
  const logout = () => {
    setToken(null);
    Cookies.remove("token");
  };
  return (
    <div className="ml-10 relative">
      {token && user ? (
        <div className=" gap-2 center w-[100px]  ">
          <UserIcon
            avatar={user.avatar}
            width={35}
            height={40}
            onClick={() => setModal("open")}
          />
        </div>
      ) : (
        <LoginOrRegister />
      )}

      <UserMenuModal logout={logout} />
    </div>
  );
};
