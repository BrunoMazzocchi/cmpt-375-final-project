import Image from "next/image";
import React, { useRef, useState, useMemo } from "react";

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
        console.log(event.target.value);
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

    const url = useMemo(() => URL.createObjectURL(file), [file]);

    return (
        <div>
            <div className="backdrop-blur-md bg-white/20 rounded-2xl overflow-hidden">
                <Image
                    src={url}
                    alt="Uploaded file"
                    width={500}
                    height={500}
                    className="rounded-2xl"
                    style={{
                        filter: `blur(${blur}px)`,
                    }}
                />
            </div>
            <input
                style={{
                    margin: '10px 0 20px 0',
                    WebkitAppearance: 'none',
                    backgroundColor: '#d3d3d3',
                    opacity: '0.7',
                    WebkitTransition: '.2s',
                    transition: 'opacity .2s'
                }}
                type="range"
                min="0"
                max="64"
                value={blur}
                onChange={handleBlurChange}
            />

            <p className="font-bold m-auto pb-8 text-white">Blur: {blur}px</p>
        </div>
    );
}