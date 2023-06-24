import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";

import Stripe from "stripe";
import { isAuthenticated } from "#/utils/auth";
import { getLaundryServiceSession, getSubscriptionItem, subscriptionCost } from "#/utils/stripe/data";
import { prisma } from "#/db/db";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
    appInfo: { // For sample support and debugging, not required for production:
        name: "Laundry-app-Development",
        version: "0.0.1",
    },
    typescript: true,
});


interface RequestContext {
    // params: {
    //     id: string
    // }
}


const router = createEdgeRouter<NextRequest, RequestContext>();


router

    .post(async (req, ctx) => {
        try {
            const host = req.nextUrl.host.startsWith("http://") || req.nextUrl.host.startsWith("https://") ? req.nextUrl.host : `http://${req.nextUrl.host}`
            console.log("host: ", host)
            const userId = await isAuthenticated(req)
            const { subscribe } = await req.json()
            if (!userId) {
                return NextResponse.redirect("/login")
            }
            const user = await prisma.user.findFirst({
                where: {
                    username: userId
                }
            })
            if (subscribe && user) {
                const subscription = await getLaundryServiceSession(stripe, user, host)
                console.log("subscription: ", subscription)
                // const product = await stripe.products.create({
                //     ...item.create
                // })
                // console.log("product: ", product)
                // const price = await stripe.prices.create({
                //     unit_amount: subscriptionCost,
                //     currency: "usd",
                //     recurring: {
                //         interval: "month"
                //     },
                //     product: product.id
                // })
                // console.log("price: ", price)
                return NextResponse.json({
                    success: true,
                    subscription: subscription
                });
            }
            if (!subscribe) {
                // TODO: Remove subscription here
                return NextResponse.json({
                    success: true,
                });
            }
        } catch {
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
