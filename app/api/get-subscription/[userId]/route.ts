import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma, stripe } from "#/db/db";
import ErrorHandler from "#/errors/ErrorHandler"
import { isAuthenticated } from "#/utils/auth";
import { getSubscription } from "#/utils/serverUtils";

interface RequestContext {
    params: {
        userId: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router
    .get(async (req, ctx) => {
        try {
            const authed = await isAuthenticated(req)
            const id = ctx.params.userId
            if (!authed) {
                return NextResponse.json({
                    success: false,
                    consoleError: "Authorization failed while retrieving a subscription class."
                })
            }
            const user = await prisma.user.findFirst({
                where: {
                    username: authed
                }
            })
            if (!user || parseInt(id) !== user.id) {
                return NextResponse.json({
                    success: false,
                    consoleError: "Authorization failed while retrieving a subscription class."
                })
            }
            if (!user.subscriptionId) {
                return NextResponse.json({
                    success: false,
                    consoleError: "That user does not have an active subscriptionId"
                })
            }
            // const subscription = await stripe.subscriptions.retrieve(user.subscriptionId)
            const subscription = await getSubscription(user.subscriptionId)
            return NextResponse.json({
                success: true,
                subscriptionResponse: subscription
            });
        } catch (err) {
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
