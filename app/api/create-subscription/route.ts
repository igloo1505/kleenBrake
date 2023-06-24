import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma, stripe } from "#/db/db";
import ErrorHandler from "#/errors/ErrorHandler"

interface RequestContext {
    // params: {
    //     id: string
    // }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router
    .post(async (req, ctx) => {
        try {
            const customerId = req.cookies.get("customer")?.value
            if (!customerId) {
                return NextResponse.json({
                    success: false,
                    consoleError: "No customerId found."
                })
            }
            const subscription = await stripe.subscriptions.create({
                customer: customerId,
                items: [{
                    price: process.env.SUBSCRIPTION_PRICE_KEY!,
                }],
                payment_behavior: 'default_incomplete',
                payment_settings: { save_default_payment_method: 'on_subscription' },
                expand: ['latest_invoice.payment_intent'],
            });
            const res = NextResponse.json({
                success: true,
                subscriptionId: subscription.id,
                /// @ts-ignore
                clientSecret: subscription?.latest_invoice?.payment_intent?.client_secret,
            });
            res.cookies.set("subscriptionId", subscription.id)
            return res
        } catch (err) {
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
