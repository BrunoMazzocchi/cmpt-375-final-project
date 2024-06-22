import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const res = await fetch(`${process.env?.SIGNED_URL}`, {
            credentials: 'include',
        });

        if (!res.ok) {
            console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
            return NextResponse.error();
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
        return NextResponse.error();
    }
}