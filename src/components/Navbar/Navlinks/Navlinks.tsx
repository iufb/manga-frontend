"use client";
import Link from "next/link";
import { NavlinksProps } from "./Navlinks.props";
import { usePathname } from "next/navigation";
import { AuthStatus } from "@/components/AuthStatus/AuthStatus";
const links = [
  {
    href: "/catalog",
    name: "Catalog",
  },
  {
    href: "/add",
    name: "Add new",
  },
];
export const Navlinks = ({
  className,
  ...props
}: NavlinksProps): JSX.Element => {
  const pathname = usePathname();
  return (
    <div
      className={`${className}  items-center flex-1 justify-self-end flex gap-4 text-lg`}
      {...props}
    >
      {links.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          className={`${pathname == href ? "font-bold" : ""}`}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};
