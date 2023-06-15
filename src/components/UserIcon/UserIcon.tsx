import Image from "next/image";
import { UserIconProps } from "./UserIcon.props";

export const UserIcon = ({
  avatar,
  width,
  height,
  className,
  ...props
}: UserIconProps): JSX.Element => {
  return (
    <div {...props} className="cursor-pointer">
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
    </div>
  );
};
