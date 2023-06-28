import { useState } from "react";

export const useGetImageResolution = (url: string) => {
  const [resolution, setResolution] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const img = new Image();
  img.onload = function () {
    setResolution({ width: img.width, height: img.height });
  };
  img.src = url;
  return resolution;
};
