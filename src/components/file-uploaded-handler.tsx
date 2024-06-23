import Image from "next/image";
import React, { useRef, useState } from "react";

interface FileUploadedHandlerProps {
    file: File,
    handleBlurChanges?: (value: number) => void,
    sliderUpload?: (file: File, blur: number) => Promise<void>,
    isSliderChanging?: boolean,
    setSliderChanging?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function FileUploadedHandler({
    file,
    handleBlurChanges,
    sliderUpload
}: FileUploadedHandlerProps) {

    const [blur, setBlur] = useState(0);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBlur = parseInt(event.target.value);
        setBlur(newBlur);

        if (handleBlurChanges) {
            handleBlurChanges(newBlur);
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
            timeoutId.current = setTimeout(() => {
                sliderUpload && sliderUpload(file, newBlur);
            }, 300);
        }
    }

    const url = URL.createObjectURL(file);

    return (
        <div>
            <div style={{
                overflow: 'hidden',
                padding: '10px'
            }}>
                <Image
                    src={url}
                    alt="Uploaded file"
                    width={500}
                    height={500}
                />
            </div>
            <input
                style={{ margin: '10px 0 20px 0' }}
                type="range"
                min="0"
                max="64"
                value={blur}
                onChange={handleBlurChange}
            />

            <p>Blur: {blur}px</p>
        </div>
    );
}