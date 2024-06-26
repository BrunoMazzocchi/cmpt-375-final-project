import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import React from "react";

type SliderProps = React.ComponentProps<typeof Slider>

export function SliderCustom({ className, ...props }: SliderProps) {
    return (
        <Slider
            defaultValue={[0]}
            max={64}
            step={1}
            className={cn("w-[60%]", className)}
            {...props}
        />
    )
}
