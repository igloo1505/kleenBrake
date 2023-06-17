import type { NextFetchEvent, NextRequest } from "next/server";
import type { NewUserData } from "../../../../state/types/AuthTypes";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma } from "../../../../db/db";
import { encryptPassword } from "../../../../utils/serverUtils";
import { setToken } from "../../../../utils/auth";

interface RequestContext {
    // user: NewUserData
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router
    .post(async (req, ctx) => {
        try {
            const json = await req.json()
            const user: NewUserData = json.user
            const hashedPassword = await encryptPassword(user.password)
            if (!user.agreeToTerms || !user.confirmAge) {
                return NextResponse.json({ success: false, publicError: "You must agree to the terms of service and confirm your age to register." })
            }
            const dashboard = await prisma.dashboard.create({
                data: {}
            })
            const newUser = await prisma.user.create({
                data: {
                    username: user.username,
                    email: user.email,
                    password: hashedPassword,
                    dashboard: {
                        connect: {
                            id: dashboard.id
                        }
                    }
                },
                include: {
                    dashboard: true
                }
            })
            let res = NextResponse.json({ newUser: newUser, success: true });
            res = await setToken(req, res, newUser.username)
            return res
        } catch (err) {
            // TODO: Handle errors appropriately in a bit...
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
