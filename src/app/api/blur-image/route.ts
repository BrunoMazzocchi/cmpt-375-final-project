import { NextRequest, NextResponse } from "next/server";
import {processEnv} from "@next/env";

export const PUT = async (request: NextRequest) => {
    const formData: FormData = await request.formData();
    try {

        console.log("FORM DATA: ", formData);

        const res = await fetch(`${process.env?.BLUR_URL}`, {
            headers: {
                "Content-Type": "image/jpeg",
            },
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            console.error(`Failed to upload data: ${res.status} ${res.statusText}`);
            console.log(res);
            return NextResponse.error();
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
        return NextResponse.error();
    }
}