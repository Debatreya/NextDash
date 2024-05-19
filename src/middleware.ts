import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import {getToken} from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    // get Token
    const token = await getToken({req: request});
    const url = request.nextUrl // get current URL

    // request.url vs request.nextUrl -> request.url is the URL that the user requested
    // request.nextUrl is the URL that the user is redirected to
    // if the user is redirected, request.url will be the URL that the user requested
    // request.nextUrl will be the URL that the user is redirected to
    // if the user is not redirected, request.url and request.nextUrl will be the same

    // if token is not present and the URL is not the sign-in, sign-up, verify or home page
    // redirect to the sign-in page


    if(token &&
        (
            url.pathname.startsWith("/sign-in") ||
            url.pathname.startsWith("/sign-up") ||
            url.pathname.startsWith("/verify") ||
            url.pathname.startsWith("/")
        )
    ){
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if(!token && url.pathname.startsWith("/dashboard")){
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // return NextResponse.redirect(new URL("/sign-in", request.url));
    return NextResponse.next();
}

// where middleware will be applied
export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*',
    ]
};