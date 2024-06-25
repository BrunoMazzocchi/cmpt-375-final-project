import React, { useEffect, useRef, useState } from "react";
import { image as stackBlurImage } from "stackblur-canvas";

interface FileUploadedHandlerProps {
    file: File;
    handleBlurChanges?: (value: number) => void;
}

export default function FileUploadedHandler({
                                                file,
                                                handleBlurChanges,
                                            }: FileUploadedHandlerProps) {
    const [blur, setBlur] = useState(0);
    const url = URL.createObjectURL(file);
    const imageRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const img = imageRef.current;
        const canvas = canvasRef.current;

        if (img && canvas) {
            img.onload = () => {
                canvas.width = 500;
                canvas.height = 500;
                const context = canvas.getContext("2d");
                if (context) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);
                    stackBlurImage(img, canvas, blur*3.8);
                }
            };
        }
    }, [url, blur]);

    const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBlur = parseInt(event.target.value);
        setBlur(newBlur);
        handleBlurChanges && handleBlurChanges(newBlur);
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <div className="border-none relative m-auto max-w-full max-h-full rounded-3x">
                <img ref={imageRef} src={url} alt="Uploaded file" style={{ display: "none" }} />
                <canvas ref={canvasRef} />
            </div>
            <input
                type="range"
                min="0"
                max="64"
                value={blur}
                onChange={handleBlurChange}
                style={{ marginTop: "40px" }}
            />
            <p className="font-bold m-auto pb-8 text-white" style={{ zIndex: 2 }}>
                Blur: {blur}px
            </p>
        </div>
    );
}
