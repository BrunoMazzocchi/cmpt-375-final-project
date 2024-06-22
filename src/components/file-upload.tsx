import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0] ?? null;
      setFile(file);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    },
    [previewUrl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div className="flex flex-col gap-4">
      {previewUrl && file ? (
        <div className="border-none relative m-auto max-w-full max-h-full rounded-3xl">
          <Image
            src={previewUrl}
            alt="Selected file"
            width={500}
            height={500}
            priority
            className="rounded-2xl"
          />
          <button
            className="flex absolute justify-center items-center w-6 h-6 top-2 right-2 bg-white text-black font-medium rounded-full p-2 hover:bg-gray-200 transition-colors duration-300 ease-in-out"
            onClick={() => {
              setFile(null);
              setPreviewUrl(null);
            }}
          >
            X
          </button>
        </div>
      ) : (
        <div
          className={`text-center border border-dashed rounded-3xl p-20 hover:scale-105 transition-transform delay-100 duration-300 ease-in-out ${
            isDragActive ? "scale-105 border-green-200 transition-colors" : ""
          }`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop file here ...</p>
          ) : (
            <p>Drag and drop, or click to select a file</p>
          )}
        </div>
      )}
    </div>
  );
}
