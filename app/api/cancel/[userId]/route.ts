import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma, stripe } from "#/db/db";
import ErrorHandler from "#/errors/ErrorHandler"
import { isAuthenticated } from "#/utils/auth";
import { CancelSubscriptionResponse } from "#/state/types/AuthTypes";


interface RequestContext {
    params: {
        userId: string
    }
}


const router = createEdgeRouter<NextRequest, RequestContext>();


router

    .post(async (req, ctx) => {
        try {
            const id = ctx.params.userId
            const authed = await isAuthenticated(req)
            if (!authed) {
                return NextResponse.json({
                    success: false,
                    publicError: "An error occurred. Please try logging in again."
                })
            }
            const user = await prisma.user.findFirst({
                where: {
                    username: authed
                }
            })
            if (!user || !user.subscriptionId || parseInt(id) !== user.id) {
                return NextResponse.json({
                    success: false,
                    publicError: "An error occurred. Please try logging in again."
                })
            }
            const cancelledSubscription = await stripe.subscriptions.update(
                user.subscriptionId,
                {
                    cancel_at_period_end: true,
                }
            );
            const cancelResponse: CancelSubscriptionResponse = {
                cancelAt: cancelledSubscription.cancel_at,
                canceledAt: cancelledSubscription.canceled_at
            }
            // NOTE: Leaving the subscription key in the prisma object for now so that the subscription will return active until the end of the billing cycle. It will be automatically removed once cancelled and expired in getSubscription
            // const updatedUser = await prisma.user.update({
            //     where: {
            //         id: user.id
            //     },
            //     data: {
            //         subscriptionId: null
            //     }
            // })
            return NextResponse.json({
                success: true,
                // updatedUser: updatedUser,
                cancelData: cancelResponse
            });
        } catch (err) {
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
