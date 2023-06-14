import { SetStateAction, useState } from "react";
import { Crop, ReactCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
export const CropImageModal = ({
  image,
  setCropImage,
  setImage,
}: {
  image: File;
  setCropImage: React.Dispatch<SetStateAction<Blob | undefined>>;
  setImage: React.Dispatch<SetStateAction<File | null>>;
}): JSX.Element => {
  const src = URL.createObjectURL(image);
  const [crop, setCrop] = useState<Crop>({
    unit: "%", // Can be 'px' or '%'
    x: 0,
    y: 0,
    width: 50,
    height: 50,
  });

  const type = image.type;
  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => {
        resolve(image);
      });
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });
  const getCroppedImage = async (src: string, crop: Crop) => {
    const image = await createImage(src);
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const canvas = document.createElement("canvas");
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise((reject, resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("the image canvas is empty"));
          return;
        }
        setCropImage(blob);
      }, type);
    });
  };
  return (
    <div className="bg-indigoGrey w-[600px] h-[600px] center flex flex-col gap-2 rounded-md">
      <ReactCrop crop={crop} onChange={(c) => setCrop(c)} locked>
        <img src={src} alt="crop" className="w-full h-full" />
      </ReactCrop>
      <div className="gap-2 flex ">
        <button
          onClick={() => {
            getCroppedImage(src, crop);
            setImage(null);
          }}
          className="btn"
        >
          Continue
        </button>
        <button className="btn" onClick={() => setImage(null)}>
          Exit
        </button>
      </div>
    </div>
  );
};
