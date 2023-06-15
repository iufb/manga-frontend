import { forwardRef, ForwardedRef, ChangeEvent, useState } from "react";
import { ImageInputProps } from "./ImageInput.props";
import { BsCloudUpload } from "react-icons/bs";
import { useAlert } from "@/hooks/useAlert";
export const ImageInput = forwardRef(function ImageInput(
  { className, setImage, label, ...props }: ImageInputProps,
  inputRef: ForwardedRef<HTMLInputElement>
): JSX.Element {
  const { setAlert } = useAlert();
  const [isSelected, setIsSelected] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSelected(false);
    const files = e.target.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // check image width and height
      reader.onload = (e) => {
        const img = new Image();
        if (typeof e.target?.result == "string") img.src = e.target?.result;
        img.onload = () => {
          const { height, width } = img;
          if (height > 500 || width > 500) {
            setImage(null);
            setAlert("Height and Width must not exceed 500px.", "error");
            return false;
          } else {
            setIsSelected(true);
            setImage(file);
          }
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
        className={`${className} w-28 h-28 border border-dotted ${
          isSelected ? "border-green-600 text-green-600" : "border-gray-400"
        } center flex-col gap-3 text-gray-700 cursor-pointer `}
      >
        <BsCloudUpload className="w-10 h-10" />
        <p className="text-sm text-center">Click to upload image.</p>
        <input
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
