import { useState } from "react";

export const useHomeHooks = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploaded, setIsUploaded] = useState(false);
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

        const data = await response.json();
        const imageUrl = data['url'];

        // Set file to the uploaded image URL
        setFile(new File([file], imageUrl));
    };

    const uploadImageBlur = async (file: File, blur: number) => {
        const fileKey = file.name.split("/").pop();
        console.log(blur.toString());
        const formData = new FormData();
        formData.append("key", fileKey as string);
        formData.append("blur_radius", blur.toString());

        const response = await fetch('/api/blur-image', {
            method: "PUT",
            body: formData,
        });

        if (!response.ok) {
            console.error("Failed to upload file.");
            throw new Error("Failed to upload file.");
        }

        const data = await response.json();
        const imageUrl = data['url'];

        // Set file to the uploaded image URL
        setFile(new File([file], imageUrl));
    }

    const handleUpload = async () => {
        if (file) {
            try {
                const signedUrlData = await getSignedUrl();
                console.log( signedUrlData['url']);
                await uploadFile(file, signedUrlData['url'], signedUrlData['fields']);
                setIsUploaded(true); // Set isUploaded to true when the upload button is clicked
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("No file selected.");
        }
    };

    return { file, isUploaded, blurApplied, handleFileChange, handleUpload, uploadImageBlur, setBlurApplied };
};