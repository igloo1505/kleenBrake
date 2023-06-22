import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma, stripe } from "db/db";

interface RequestContext {
    // params: {
    //     id: string
    // }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router

    .get(async (req, ctx) => {
        try {

            const price = await stripe.prices.retrieve(process.env.PRICE!);

            return NextResponse.json({
                publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
                unitAmount: price.unit_amount,
                currency: price.currency,
            })
        } catch {
            return NextResponse.json({ success: false });
        }
    })


export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
