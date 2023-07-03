import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { assignRefererToken, clearTokens, isAuthenticated, refreshTokens } from "./utils/auth";
// import { URL } from "url";

const protectedRoutes = [
    '/profile/',
    '/feed/',
    '/edit/'
]


export async function middleware(req: NextRequest) {
    const isAuthed = await isAuthenticated(req)
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
        let res = NextResponse.next()
        res = await refreshTokens(req, res)
        return res
    }
    return NextResponse.next()
}
