import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { assignRefererToken, clearTokens, isAuthenticated, refreshTokens } from "./utils/auth";

const protectedRoutes = [
    '/profile/',
    '/feed/',
    '/edit/'
]


export async function middleware(req: NextRequest) {
    const isAuthed = await isAuthenticated(req)
    const _headers = new Headers(req.headers)
    if (req.nextUrl.pathname.startsWith("/api")) {
        _headers.set("Access-Control-Allow-Origin", "*")
        // response.headers.append("Access-Control-Allow-Origin", "*")
    }
    let response = NextResponse.next({
        request: {
            headers: _headers
        }
    })
    if (req.nextUrl.pathname.startsWith("/referer/")) {
        const refererId = req.nextUrl.pathname.split("/referer/")[1]
        if (refererId) {
            let res = NextResponse.rewrite(new URL("/signup", req.url))
            res = await assignRefererToken(refererId, res)
            return res
        }
    }
    if (!isAuthed) {
        for (var i = 0; i < protectedRoutes.length; i++) {
            if (req.nextUrl.pathname.startsWith(protectedRoutes[i])) {
                let response = NextResponse.redirect(new URL('/', req.url))
                let res = clearTokens(response)
                return res
            }
        }
    }
    if (isAuthed) {
        response = await refreshTokens(req, response)
        return response
    }
    return NextResponse.next({
        request: {
            headers: _headers
        }
    })
}
