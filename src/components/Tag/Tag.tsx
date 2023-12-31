import Link from "next/link";
import { TagProps } from "./Tag.props";

export const Tag = ({ name, className, ...props }: TagProps): JSX.Element => {
  return (
    <div
      className={`${className} capitalize text-md  px-2  bg-gray-100 border border-gray-400 rounded-md text-gray-400`}
      {...props}
    >
      <Link href={"#"}> {name}</Link>
    </div>
  );
};
