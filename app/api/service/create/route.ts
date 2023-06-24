import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma, stripe } from "#/db/db";
import ErrorHandler from "#/errors/ErrorHandler"
import { isAuthenticated } from "#/utils/auth";
import { getServiceItemDetails } from "#/utils/serverUtils";

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
            const { quantity } = await req.json()
            if (!customerId) {
                return NextResponse.json({
                    success: false,
                    consoleError: "No customerId found."
                })
            }
            const service = await getServiceItemDetails()
            if (!service.unit_amount) {
                return NextResponse.json({
                    success: false,
                    consoleError: "No service item was found."
                })
            }
            const paymentIntent = await stripe.paymentIntents.create({
                amount: service.unit_amount * quantity,
                currency: "usd",
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            const res = NextResponse.json({
                success: true,
                paymentId: paymentIntent.id,
                clientSecret: paymentIntent.client_secret,
            });
            res.cookies.set("paymentId", paymentIntent.id)
            return res
        } catch (err) {
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
