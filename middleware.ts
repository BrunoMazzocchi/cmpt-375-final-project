// Imports
// ========================================================
import { NextResponse, type NextRequest } from "next/server";

// Config
// ========================================================
const corsOptions: {
    allowedMethods: string[];
    allowedOrigins: string[];
    allowedHeaders: string[];
    exposedHeaders: string[];
    maxAge?: number;
    credentials: boolean;
} = {
    allowedMethods: (process.env?.ALLOWED_METHODS || "").split(","),
    allowedOrigins: (process.env?.ALLOWED_ORIGIN || "").split(","),
    allowedHeaders: (process.env?.ALLOWED_HEADERS || "").split(","),
    exposedHeaders: (process.env?.EXPOSED_HEADERS || "").split(","),
    credentials: process.env?.CREDENTIALS == "true",
};

// Middleware
// ========================================================
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // Response
    const response = NextResponse.next();

    // Allowed origins check
    const origin = request.headers.get('origin') ?? '';
    if (corsOptions.allowedOrigins.includes('*') || corsOptions.allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }

    // Set default CORS headers
    response.headers.set("Access-Control-Allow-Credentials", corsOptions.credentials.toString());
    response.headers.set("Access-Control-Allow-Methods", corsOptions.allowedMethods.join(","));
    response.headers.set("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
    response.headers.set("Access-Control-Expose-Headers", corsOptions.exposedHeaders.join(","));

    // Return
    return response;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/api/:path*",
};