import {useState} from "react";

export const useHomeHooks = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [blurApplied, setBlurApplied] = useState(0);


    const downloadFile = async (file: File) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }

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

    const uploadFile = async (file: File, url: string, fields: any): Promise<File> => {
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

        // Return file created with the imageUrl
        return new File([file], imageUrl);
    };

    const uploadImageBlur = async (file: File, blur: number) => {
        const fileKey = file.name.split("/").pop();
        const formData = new FormData();
        formData.append("key", fileKey as string);
        formData.append("blur_radius", blur.toString());

        const response = await fetch('/api/blur-image', {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            console.error("Failed to upload file.");
            console.log(response);
            throw new Error("Failed to upload file.");
        }

        const data = await response.json();
        const imageUrl = data['url'];

        const imageBlob = await fetchImage(imageUrl);
        const newFile = new File([imageBlob], fileKey!, {type: "image/jpeg"});
        setFile(newFile);
    }

    const fetchImage = async (url: string): Promise<Blob> => {

        const response = await fetch(`api/images/?url=${url}`,{
            method: "GET",
            headers: {
                "Content-Type": "image/jpeg"
            },
        });
        return await response.blob();
    }

    const handleUpload = async () => {
        if (file) {
            try {
                const signedUrlData = await getSignedUrl();
                console.log( signedUrlData['url']);
                const newFile = await uploadFile(file, signedUrlData['url'], signedUrlData['fields']);
                setFile(newFile);
                setIsUploaded(true);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error("No file selected.");
        }
    };

    return { file, isUploaded, blurApplied, handleFileChange, handleUpload, uploadImageBlur, setBlurApplied, downloadFile};
};