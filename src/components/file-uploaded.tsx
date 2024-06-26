import Image from "next/image";
import React, { useRef, useState, useMemo } from "react";
import {cn} from "@/lib/utils";
import {className} from "postcss-selector-parser";
import {Slider} from "@/components/ui/slider";

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

    const handleBlurChange = (event: { target: { value: number } }) => {
        console.log(event.target.value);
        const newBlur = parseInt(String(event.target.value));
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


            <div className="flex items-center gap-2">
                <Slider
                    defaultValue={[0]}
                    max={64}
                    step={1}
                    className={`w-[80%] bg-white rounded-full custom-slider ${className}`}
                    onValueChange={(value) => handleBlurChange({ target: { value: value[0] } })}
                />
                <p className="font-bold text-white">{blur}px</p>
            </div>
        </div>
    );
}