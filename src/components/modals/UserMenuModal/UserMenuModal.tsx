import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { getEmailLogin } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { FiSettings } from "react-icons/fi";

export const UserMenuModal = ({
  logout,
}: {
  logout: () => void;
}): JSX.Element => {
  const { user } = useAuth();
  const { isOpen, setModal } = useModal();
  const userHref = `/${getEmailLogin(user?.email)}`;
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => setModal("close"));
  const path = usePathname();
  useEffect(() => {
    setModal("close");
  }, [path]);
  if (isOpen) {
    return (
      <div
        className="w-30 h-30  p-3 rounded bg-gray-700 absolute top-12 left-4  flex flex-col center"
        ref={modalRef}
      >
        <Link href={userHref}>Profile</Link>
        <Link href={`${userHref}/edit`} className="flex gap-2 center">
          <FiSettings className="w-3 h-3" />
          Settings
        </Link>
        <button onClick={logout}>Log out</button>
      </div>
    );
  } else {
    return <></>;
  }
};
