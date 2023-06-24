import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma } from "#/db/db";
import ErrorHandler from "#/errors/ErrorHandler"
import { isAuthenticated } from "#/utils/auth";
import { getStripeCustomer } from "#/utils/serverUtils";
import { CreateStripeCustomerType } from "#/state/types/AuthTypes";
import Stripe from "stripe";

interface RequestContext {
    // params: {
    //     id: string
    // }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router
    .post(async (req, ctx) => {
        try {
            const data: CreateStripeCustomerType = await req.json()
            const userId = await isAuthenticated(req)
            if (!userId) {
                return NextResponse.json({
                    success: false,
                    consoleError: "Unauthorized attempt.",
                    publicError: "Unauthorized. If this is a legitimate attempt, please try logging back in."
                })
            }
            const customer = await getStripeCustomer(userId, data)
            if (!customer) {
                return NextResponse.json({
                    success: false,
                    consoleError: "There was an error creating that customer."
                })
            }
            const c: Stripe.Customer = customer
            const res = NextResponse.json({
                success: true,
                customer: customer
            });
            res.cookies.set("customer", c.id)
            return res
        } catch (err) {
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
