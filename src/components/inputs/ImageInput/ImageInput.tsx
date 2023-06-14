import { forwardRef, useRef, ForwardedRef, useImperativeHandle } from "react";
import { ImageInputProps } from "./ImageInput.props";
import { BsCloudUpload } from "react-icons/bs";
export const ImageInput = forwardRef(function ImageInput(
  { className, ...props }: ImageInputProps,
  inputRef: ForwardedRef<HTMLInputElement>
): JSX.Element {
  return (
    <>
      <label
        htmlFor="avatar"
        className={`${className} w-28 h-28 border border-dotted border-gray-400 center flex-col gap-3 text-gray-700 cursor-pointer`}
      >
        <BsCloudUpload className="w-10 h-10" />
        <p className="text-sm text-center">Click to upload image.</p>
        <input type="file" {...props} ref={inputRef} id="avatar" hidden />
      </label>
    </>
  );
});
