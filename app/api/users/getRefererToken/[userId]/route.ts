import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { assignRefererToken } from "#/utils/auth";


interface RequestContext {
    params: {
        userId: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router
    .get(async (req, ctx) => {
        try {
            let res = NextResponse.json({})
            if (!ctx.params.userId) {
                return res
            }
            res = await assignRefererToken(ctx.params.userId, res)
            return res
        } catch (err) {
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
