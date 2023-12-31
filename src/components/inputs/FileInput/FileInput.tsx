import { ChangeEvent, useState } from "react";
import { FileInputProps } from "./FileInput.props";
import { ModalContainer } from "@/components/modals/ModalContainer/ModalContainer";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import { upload } from "@/services/uploads";
import { bytesToMB } from "@/utils";
import { usePathname } from "next/navigation";

export const FileInput = ({
  setFiles,
  label,
  className,
  ...props
}: FileInputProps): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const id = usePathname().split("/")[2];
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target?.files[0]);
    e.target.value = "";
    e.target.files = null;
  };
  const uploadZip = async () => {
    setProgress(0);
    upload({
      type: "chapter",
      file,
      params: {
        comicName: id,
      },
      config: {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      },
    })?.then(({ data }) => {
      setFiles(data);
      setFile(null);
    });
  };
  return (
    <div className={`${className}`} {...props}>
      <label
        htmlFor="file"
        className="cursor-pointer text-2xl text-indigoGrey font-bold"
      >
        {label}
      </label>
      <input
        type="file"
        accept=".zip"
        id="file"
        hidden
        onChange={handleChange}
      />
      {file && (
        <ModalContainer>
          <div className="w-full  max-w-[500px] bg-indigoGrey center h-full flex-col gap-4 p-5 rounded-md">
            <div className="w-full flex flex-col gap-1">
              <div className="flex gap-2 text-white">
                <span className="flex-1 truncate">{file.name}</span>
                <span>{bytesToMB(file.size)} MB</span>
              </div>

              <ProgressBar percentage={progress} />
            </div>
            <div className="flex gap-2 ">
              <button className="btn btn-sm" onClick={uploadZip}>
                Upload
              </button>
              <button className="btn btn-sm" onClick={() => setFile(null)}>
                Dismiss
              </button>
            </div>
          </div>
        </ModalContainer>
      )}
    </div>
  );
};
