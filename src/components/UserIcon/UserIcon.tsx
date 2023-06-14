import Image from "next/image";
import { UserIconProps } from "./UserIcon.props";

export const UserIcon = ({
  avatar,
  width,
  height,
  className,
}: UserIconProps): JSX.Element => {
  return (
    <Image
      src={avatar ? `http://localhost:3000/${avatar}` : "/user.jpg"}
      alt="user"
      width={width}
      height={height}
      style={{
        objectFit: "contain",
      }}
      className={`${className} rounded-md`}
    />
  );
};
