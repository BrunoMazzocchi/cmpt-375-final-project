import { NextRequest, NextResponse } from "next/server";
import {processEnv} from "@next/env";

export const GET = async (request: NextRequest) => {
    try {
        const res = await fetch(`${process.env?.SIGNED_URL}`, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json',
                'accept': '*/*',
                'accept-encoding': 'gzip, deflate, br',
                'connection': 'keep-alive',
            }
        });

        if (!res.ok) {
            console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
            return NextResponse.error();
        }

        const data = await res.json();
        console.log("DATA: ", data);
        return NextResponse.json(data);

    } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
        return NextResponse.error();
    }
}