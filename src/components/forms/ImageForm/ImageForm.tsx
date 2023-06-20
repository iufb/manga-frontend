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
  className,
  ...props
}: ImageFormProps): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(true);
  return (
    <div {...props} className={`${className} flex gap-4`}>
      <ImageInput setImage={setImage} label={label} setIsValid={setIsValid} />
      {image && isValid && (
        <ImagePreview
          width={90}
          local
          height={90}
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
            setImage={setImage}
            setIsValid={setIsValid}
          />
        </ModalContainer>
      )}
    </div>
  );
};
