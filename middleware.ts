import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { clearTokens, isAuthenticated, refreshTokens } from "./utils/auth";

const protectedRoutes = [
    '/profile/',
    '/feed/',
    '/edit/'
]


export async function middleware(req: NextRequest) {
    const isAuthed = await isAuthenticated(req)
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
