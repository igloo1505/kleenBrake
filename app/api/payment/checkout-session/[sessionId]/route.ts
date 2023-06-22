import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { NewUserData } from "state/types/AuthTypes";
import { stripe } from "db/db";

interface RequestContext {
    params: {
        sessionId: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router

    .get(async (req, ctx) => {
        try {
            const sessionId = ctx.params?.sessionId || false
            if (!sessionId) {
                return NextResponse.json({ success: false, consoleError: "No session ID found" })
            }
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            return NextResponse.json({
                success: true,
                session: session
            });
        } catch {
            return NextResponse.json({ success: false });
        }
    })


export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
