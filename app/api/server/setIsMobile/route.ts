import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma } from "#/db/db";
import ErrorHandler from "#/errors/ErrorHandler"

interface RequestContext {
    // params: {
    //     id: string
    // }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router

    .get(async (req, ctx) => {
        try {
            let res = NextResponse.next()
            res.cookies.set("isMobile", "1")
            return res
        } catch (err) {
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
