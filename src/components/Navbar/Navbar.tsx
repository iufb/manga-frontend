import Link from "next/link";
import { Navlinks } from "./Navlinks/Navlinks";
import { AuthStatus } from "../AuthStatus/AuthStatus";

export function Navbar() {
  return (
    <header className="navbar px-56 bg-indigoGrey  text-customWhite">
      <nav className="w-full grid grid-cols-navbar  ">
        <Link href={"/"} className="font-bold text-2xl cursor-pointer ">
          Manga
        </Link>
        <Navlinks />
        <AuthStatus />
      </nav>
    </header>
  );
}
