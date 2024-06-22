"use client";

import React from "react";
import FileUpload from "@/components/file-upload";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 overflow-hidden">
      <div className="relative w-screen max-w-lg flex justify-center items-center">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-difference filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-difference filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-difference filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        <div className="relative w-full p-8 bg-black rounded-3xl">
          <h1 className="text-4xl font-bold m-auto pb-8 text-center text-white">
            Upload an image
          </h1>
          <div className="mb-4">
            <FileUpload />
          </div>
          <button className="w-full px-4 py-2 bg-white text-black font-bold rounded-3xl">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
