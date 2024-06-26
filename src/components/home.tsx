import FileUpload from "@/components/file-upload";
import React from "react";

export default function Home({}) {
    return <div className="relative w-full p-8 bg-black rounded-3xl">
        <h1 className="text-4xl font-bold m-auto pb-8 text-center text-white">
            Upload an image
        </h1>
        <div className="mb-4">
            <FileUpload/>
        </div>
    </div>
}