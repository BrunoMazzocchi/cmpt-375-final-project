import React, { useState } from "react";
import Image from "next/image";

interface FileUploadedHandlerProps {
    file: File;
}

interface OnBlurChangeProps {
    blurChanges: number;
}

export default function FileUploadedHandler({ file }: FileUploadedHandlerProps, { blurChanges }: OnBlurChangeProps) {

    const [blur, setBlur] = useState(0);

    const handleBlurChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBlur(parseInt(event.target.value, 10));
    };

    const url = URL.createObjectURL(file);

    return (
        <div>
            <div style={{ filter: `blur(${blur}px)` }}>
                <Image src={url} alt="Uploaded file" width={500} height={500} />
            </div>
            <input
                type="range"
                min="0"
                max="20"
                value={ blurChanges }
                onChange={ handleBlurChange }
            />
        </div>
    );
}