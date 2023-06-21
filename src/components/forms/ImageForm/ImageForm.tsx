import { ImageInput } from "@/components/inputs/ImageInput/ImageInput";
import { ImageFormProps } from "./ImageForm.props";
import { ModalContainer } from "@/components/modals/ModalContainer/ModalContainer";
import { CropImageModal } from "@/components/modals/CropImageModal/CropImageModal";
import { ImagePreview } from "@/components/ImagePreview/ImagePreview";
import { useState } from "react";

export const ImageForm = ({
  image,
  setImage,
  label,
  imageFor,
  className,
  ...props
}: ImageFormProps): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(true);
  return (
    <div {...props} className={`${className} flex gap-4 items-end`}>
      <ImageInput
        setImage={setImage}
        label={label}
        setIsValid={setIsValid}
        minWidth={imageFor == "bg" ? 1200 : undefined}
      />
      {image && isValid && (
        <ImagePreview
          width={imageFor == "default" ? 90 : 400}
          local
          height={imageFor == "default" ? 90 : 200}
          src={URL.createObjectURL(image)}
          deleteImage={() => {
            setImage(null);
          }}
        />
      )}
      {!isValid && image && (
        <ModalContainer>
          <CropImageModal
            image={image}
            imageFor={imageFor}
            setImage={setImage}
            setIsValid={setIsValid}
          />
        </ModalContainer>
      )}
    </div>
  );
};
