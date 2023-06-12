import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { NewUserData } from "../../../../state/types/AuthTypes";
import { prisma } from "../../../../db/db";
import { clearTokens } from "../../../../utils/auth";

interface RequestContext {
    // params: {
    //     id: string
    // }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router

    .post(async (req, ctx) => {
        try {
            let res = new NextResponse()
            res = await clearTokens(res)
            console.log("res: ", res)
            return res
        } catch {
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
