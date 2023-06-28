import Image from "next/image";
import { ImagePreviewProps } from "./ImagePreview.props";

import { AiOutlineDelete } from "react-icons/ai";
export const ImagePreview = ({
  className,
  width,
  height,
  fill,
  src,
  children,
  deleteImage,
  local,
  ...props
}: ImagePreviewProps) => {
  const imageSrc = src && local ? src : `http://localhost:3000/${src}`;

  return (
    <div
      {...props}
      className={`relative center ${className} `}
      style={{
        width,
      }}
    >
      <Image
        width={width}
        height={width}
        fill={fill}
        style={{
          objectFit: fill ? "contain" : "none",
        }}
        src={src ? imageSrc : "/default-image.png"}
        alt={"preview"}
      />
      {children}
      {deleteImage && (
        <button
          className="absolute btn bg-opacity-80 btn-sm btn-square top-0 left-0"
          onClick={deleteImage}
        >
          <AiOutlineDelete className="  bg-gray-700  fill-white  " />
        </button>
      )}
    </div>
  );
};
