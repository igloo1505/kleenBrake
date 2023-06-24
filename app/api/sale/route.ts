import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import env from "dotenv";

import Stripe from "stripe";
import { isAuthenticated } from "#/utils/auth";
import { getLaundryServiceItem, laundryServiceCost } from "#/utils/stripe/data";
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
            const userId = await isAuthenticated(req)
            const body = await req.json()
            const quantity = body.quantity || 1
            if (!userId) {
                return NextResponse.redirect("/login")
            }
            const laundryItem = getLaundryServiceItem(1)
            const product = await stripe.products.create({
                ...laundryItem.create
            })
            const price = await stripe.prices.create({
                unit_amount: quantity * laundryServiceCost,
                currency: "usd",
                product: product.id
            })
            console.log("price: ", price)
            return NextResponse.json({
                success: true,
                price: price
            });
        } catch {
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
