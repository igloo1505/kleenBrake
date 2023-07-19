import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { LoginUserData } from "../../../../state/types/AuthTypes";
import { prisma } from "../../../../db/db";
import { comparePasswords, getCorsHeaders } from "../../../../utils/serverUtils";
import { setToken } from "../../../../utils/auth";

interface RequestContext {
    // params: {
    //     id: string
    // }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router

    .post(async (req, ctx) => {
        console.log("getCorsHeaders(req): ", getCorsHeaders(req))
        try {
            const json = await req.json()
            const data: LoginUserData = json.user
            const user = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email: data.email },
                        { username: data.email }
                    ]
                }
            })
            if (!user) {
                return new NextResponse(JSON.stringify({ success: false, user: user }), getCorsHeaders(req, 404)
                )
            }
            const validPassword = await comparePasswords(data.password, user?.password)
            if (!validPassword) {
                // return NextResponse.json({ success: false });
                return new NextResponse(JSON.stringify({ success: false }), getCorsHeaders(req, 401)
                )
            }
            let returnUser = { ...user }
            // @ts-ignore
            delete returnUser.password
            // let res = NextResponse.json()
            let res = new NextResponse(JSON.stringify({ user: returnUser, success: true }), getCorsHeaders(req, 200)
            )
            res = await setToken(req, res, returnUser.username, true)
            return res
        } catch {
            return new NextResponse(JSON.stringify({ success: false }), getCorsHeaders(req, 500)
            )
        }
    })






export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}

export async function OPTIONS(req: NextRequest, ctx: RequestContext) {
    console.log("req: ", req)
    console.log("In here?")
    return new NextResponse(null, getCorsHeaders(req))
}


