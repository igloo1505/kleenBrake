import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma } from "#/db/db";
import ErrorHandler from "#/errors/ErrorHandler"
import { getChildrenData } from "#/utils/serverUtils";

interface RequestContext {
    // params: {
    //     id: string
    // }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router
    // middleware
    // .use(async (req, event, next) => {
    //   const start = Date.now();
    //   await next(); // call next in chain
    //   const end = Date.now();
    //   console.log(`Request took ${end - start}ms`);
    // })

    .get(async (req, ctx) => {
        try {
            const { user } = await req.json()
            if (!user) {
                return NextResponse.json({ success: false, consoleError: "No User Found" })
            }
            const childrenData = await getChildrenData(user)
            return NextResponse.json({ lineage: childrenData, success: true });
        } catch (err) {
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
