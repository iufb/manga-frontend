import { SetStateAction, createRef, useCallback, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
export const CropImageModal = ({
  image,
  setImage,
  setIsValid,
}: {
  image: File | Blob | null | undefined;
  setImage: React.Dispatch<SetStateAction<File | Blob | null | undefined>>;
  setIsValid: React.Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const src = image ? URL.createObjectURL(image) : "default-image.png";
  const cropperRef = createRef<ReactCropperElement>();
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      cropperRef.current?.cropper
        .getCroppedCanvas()
        .toBlob((file) => setImage(file));
    }
  };

  return (
    <div className="bg-indigoGrey  w-[700px] h-[700px] p-4 center flex flex-col gap-2 rounded-md z-20 ">
      <Cropper
        ref={cropperRef}
        style={{ height: 400, width: "100%" }}
        zoomTo={0.5}
        initialAspectRatio={1}
        preview=".img-preview"
        src={src}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        guides={true}
      />
      <div className="gap-2 flex z-40 ">
        <button
          onClick={() => {
            getCropData();
            setIsValid(true);
          }}
          className="btn"
        >
          Continue
        </button>
        <button className="btn" onClick={() => setIsValid(true)}>
          Exit
        </button>
      </div>
    </div>
  );
};
