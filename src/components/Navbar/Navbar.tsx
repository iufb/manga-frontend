import Link from "next/link";
import { Navlinks } from "./Navlinks/Navlinks";
import { AuthStatus } from "../AuthStatus/AuthStatus";
import { cookies } from "next/dist/client/components/headers";

export async function Navbar() {
  const user = await getUserData();
  return (
    <header className="navbar px-56 bg-indigoGrey  text-customWhite">
      <nav className="w-full grid grid-cols-navbar  ">
        <Link href={"/"} className="font-bold text-2xl cursor-pointer ">
          Manga
        </Link>
        <Navlinks />
        <AuthStatus user={user} />
      </nav>
    </header>
  );
}

async function getUserData() {
  const data = await fetch("http://localhost:3000/api/user", {
    headers: {
      authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });
  return data.json();
}
