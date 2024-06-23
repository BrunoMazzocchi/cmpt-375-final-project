import React, {useState} from "react";
import Image from "next/image";

interface FileUploadedHandlerProps {
    file: File,
    handleBlurChanges?: (value: number) => void
}

export default function FileUploadedHandler({file, handleBlurChanges}: FileUploadedHandlerProps) {

    const [blur, setBlur] = useState(0);

    const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newBlur = parseInt(event.target.value);
        setBlur(newBlur);
        if (handleBlurChanges) {
            handleBlurChanges(newBlur);
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
                    style={{
                        filter: `blur(${blur}px)`,
                    }}
                    src={url}
                    alt="Uploaded file"
                    width={500}
                    height={500}
                />
            </div>
            <input
                style={{margin: '10px 0 20px 0'}}
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