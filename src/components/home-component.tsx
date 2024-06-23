import React from "react";
import FileUploadedHandler from "@/components/file-uploaded-handler";
import FileUpload from "@/components/file-upload";
import { useHomeHooks } from "@/services/hooks/home-hooks";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomeComponent() {
    const { file, isUploaded, blurApplied, handleFileChange, handleUpload, uploadImageBlur, setBlurApplied } = useHomeHooks();

    const ImageUploaded = (file: File) => (
        <>
            <h1 className="text-4xl font-bold m-auto pb-8 text-center text-white">
                Image upload successfully! Drag to apply a blur effect
            </h1>
            <div className="mb-4">
                <FileUploadedHandler file={file} handleBlurChanges={setBlurApplied} />
            </div>
            <button className="w-full px-4 py-2 bg-white text-black font-bold rounded-3xl"
                    onClick={() => uploadImageBlur(file, blurApplied)}>
                Save and Upload
            </button>
            <ToastContainer />
        </>
    );

    const ImageToBeUploaded = () => (
        <>
            <h1 className="text-4xl font-bold m-auto pb-8 text-center text-white">
                Upload an image
            </h1>
            <div className="mb-4">
                <FileUpload onFileChange={handleFileChange} />
            </div>
            <button className="w-full px-4 py-2 bg-white text-black font-bold rounded-3xl"
                    onClick={handleUpload}>
                Upload
            </button>
            <ToastContainer />
        </>
    );

    return isUploaded && file ? ImageUploaded(file) : ImageToBeUploaded();
}
