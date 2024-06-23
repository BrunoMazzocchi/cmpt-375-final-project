import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const formData: FormData = await request.formData();
    const payload = {
        key: formData.get('key'),
        blur_radius: formData.get('blur_radius'),
    };

    try {
        console.log("FORM DATA: ", payload);

        const res = await fetch(`${process.env?.BLUR_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            cache: 'no-cache',
        });

        if (!res.ok) {
            console.error(`Failed to upload data: ${res.status} ${res.statusText}`);
            const errorText = await res.text();
            console.error(`Response body: ${errorText}`);
            return new NextResponse(JSON.stringify({ error: errorText }), { status: res.status });
        }

        const data = await res.json();

        return NextResponse.json({
            message: true,
            url: `https://d11kkclchkiwpe.cloudfront.net/processed/${data['key']}`,
        });

    } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
    }
}
