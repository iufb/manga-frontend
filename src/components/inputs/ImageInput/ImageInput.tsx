import { forwardRef, ForwardedRef, ChangeEvent, useState } from "react";
import { ImageInputProps } from "./ImageInput.props";
import { BsCloudUpload } from "react-icons/bs";
import { useAlert } from "@/hooks/useAlert";
export const ImageInput = forwardRef(function ImageInput(
  {
    className,
    setImage,
    setIsValid,
    minWidth,
    label,
    ...props
  }: ImageInputProps,
  inputRef: ForwardedRef<HTMLInputElement>
): JSX.Element {
  const { setAlert } = useAlert();
  const acceptedFiles = "image/jpg, image/jpeg , image/webp, image/png";
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // check image width
      reader.onload = (e) => {
        const img = new Image();
        if (typeof e.target?.result == "string") img.src = e.target?.result;
        img.onload = () => {
          const { width } = img;
          if (minWidth && width < minWidth) {
            setAlert(`Width should be greater than ${minWidth}px`, "error");
            return false;
          }
          if (width > 1000) {
            setIsValid(false);
          }
          setImage(file);
        };
      };
    }
    e.target.value = ""; // can select the same file.
  };

  return (
    <>
      <h2 className="text-xl ">{label}</h2>
      <label
        htmlFor="avatar"
        className={`${className} w-28 h-28 border border-dotted  border-gray-400
         center flex-col gap-3 text-gray-700 cursor-pointer `}
      >
        <BsCloudUpload className="w-10 h-10" />
        <p className="text-sm text-center">Click to upload image.</p>
        <input
          accept={acceptedFiles}
          type="file"
          {...props}
          ref={inputRef}
          id="avatar"
          hidden
          onChange={handleChange}
        />
      </label>
    </>
  );
});
