import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma } from "#/db/db";
import { isAuthenticated } from "#/utils/auth";

interface RequestContext {
    // params: {
    //     id: string
    // }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router
    .put(async (req, ctx) => {
        try {
            const data = await req.json()
            const userId = await isAuthenticated(req)
            if (!userId) {
                return NextResponse.redirect("/")
            }
            const updatedUser = await prisma.user.update({
                where: {
                    username: userId
                },
                data: {
                    ...data.user,
                    dashboard: {
                        ...data.dashboard
                    }
                }
            })
            return NextResponse.json({
                updatedUser: updatedUser,
                success: true
            });
        } catch (err) {
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
