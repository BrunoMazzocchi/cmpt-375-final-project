import { NextRequest, NextResponse } from "next/server";
export const POST = async (request: NextRequest) => {
    try {
        const data: FormData = await request.formData();
        const file = data.get('filepond');
        const urlToPost = data.get('url');
        const fields = JSON.parse(data.get('fields') as string);

        if (!file) {
            console.error("No file selected.");
            return NextResponse.error();
        }

        if ((file as File).type !== "image/jpeg") {
            console.error("Only JPG images are allowed.");
            return NextResponse.error();
        }

        const fileEntry = file as File;

        const formData = new FormData();

        formData.append("key", fields['key']);

        Object.entries(fields).forEach(([key, value]) => {
            if (key !== "key") {
                formData.append(key, value as string);
            }
        });

        formData.append("file", fileEntry, fileEntry.name);

        const res = await fetch(urlToPost as string, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`Failed to upload file: ${res.status} ${res.statusText}`);
            console.error("Error details:", errorText);
            return NextResponse.error();
        }

        console.log(`${process.env?.CLOUDFRONT_URL}/${fields.key}`);

        return NextResponse.json({
            message: true,
            url: `${process.env?.CLOUDFRONT_URL}/${fields.key}`
        });


    } catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.error();
    }
};
