"use client";
import React, {useState} from "react";
import FileUpload from "@/components/file-upload";
import FileUploadedHandler from "@/components/file-uploaded-handler";
import {headers} from "next/headers";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploaded, setIsUploaded] = useState(false); // Add a new state variable
    const [blurApplied, setBlurApplied] = useState(0);

    const handleFileChange = (file: File | null) => {
        setFile(file);
    };

    const getSignedUrl = async () => {
        const response = await fetch("/api/signed");
        if (!response.ok) {
            console.error("Failed to get signed URL.");
            throw new Error("Failed to get signed URL.");
        }
        return await response.json();
    };

    const uploadFile = async (file: File, url: string, fields: any) => {
        const formData = new FormData();
        formData.append("filepond", file);
        formData.append("url", url);
        formData.append("fields", JSON.stringify(fields));

        const response = await fetch('/api/upload', {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            console.error("Failed to upload file.");
            throw new Error("Failed to upload file.");
        }
    };


    const handleUpload = async () => {
        if (file) {
            try {
                const signedUrlData = await getSignedUrl();
                await uploadFile(file, signedUrlData['url'], signedUrlData['fields']);
                setIsUploaded(true); // Set isUploaded to true when the upload button is clicked
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("No file selected.");
        }
    };


    const applyBlur = (blur: number) => {
        console.log("Blur applied!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4 overflow-hidden">
            <div className="relative w-screen max-w-lg flex justify-center items-center">
                <div
                    className="absolute top-0 -left-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-difference filter blur-3xl opacity-50 animate-blob"></div>
                <div
                    className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-difference filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
                <div
                    className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-difference filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
                <div className="relative w-full p-8 bg-black rounded-3xl">
                    {isUploaded && file ? (
                        <><h1 className="text-4xl font-bold m-auto pb-8 text-center text-white">
                            Image upload successfully! Drag to apply a blur effect
                        </h1>
                            <div className="mb-4">
                                <FileUploadedHandler file={file}/>
                            </div>
                            <button className="w-full px-4 py-2 bg-white text-black font-bold rounded-3xl"
                                    onClick={handleUpload}>
                                Save and Upload
                            </button>
                        </>
                    ) : (
                        <><h1 className="text-4xl font-bold m-auto pb-8 text-center text-white">
                            Upload an image
                        </h1>
                            <div className="mb-4">
                                <FileUpload onFileChange={handleFileChange}/>
                            </div>
                            <button className="w-full px-4 py-2 bg-white text-black font-bold rounded-3xl"
                                    onClick={handleUpload}>
                                Upload
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
        ;
}
