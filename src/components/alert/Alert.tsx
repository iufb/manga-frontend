"use client";
import { AlertProps } from "./Alert.props";

import { useAlert } from "@/hooks/useAlert";
import {
  AiOutlineWarning,
  AiOutlineInfoCircle,
  AiFillCheckCircle,
} from "react-icons/ai";
import { BiErrorAlt } from "react-icons/bi";

export const Alert = ({ className, ...props }: AlertProps): JSX.Element => {
  const { type, text } = useAlert();
  const getIcon = () => {
    switch (type) {
      case "":
        return;
      case "warning":
        return <AiOutlineWarning />;
      case "error":
        return <BiErrorAlt />;
      case "success":
        return <AiFillCheckCircle />;
      case "info":
        return <AiOutlineInfoCircle />;
    }
  };
  if (text && type) {
    return (
      <div
        className={`alert  alert-${type}  absolute z-10  max-w-[500px] right-2 top-10 w-full justify-normal `}
        {...props}
      >
        {getIcon()}
        <span>{text}</span>
      </div>
    );
  } else {
    return <></>;
  }
};
