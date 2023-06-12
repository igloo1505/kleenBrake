import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { LoginUserData } from "../../../../state/types/AuthTypes";
import { prisma } from "../../../../db/db";
import { comparePasswords } from "../../../../utils/serverUtils";
import { setToken } from "../../../../utils/auth";

interface RequestContext {
    // params: {
    //     id: string
    // }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router

    .post(async (req, ctx) => {
        try {
            const json = await req.json()
            const data: LoginUserData = json.user
            console.log("json: ", json)
            const user = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email: data.email },
                        { username: data.email }
                    ]
                }
            })
            if (!user) {
                return NextResponse.json({ success: false, user: user });
            }
            const validPassword = await comparePasswords(data.password, user?.password)
            if (!validPassword) {
                return NextResponse.json({ success: false });
            }
            let returnUser = { ...user }
            // @ts-ignore
            delete returnUser.password
            let res = NextResponse.json({ user: returnUser, success: true })
            res = await setToken(req, res, returnUser.username)
            return res
        } catch {
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}


