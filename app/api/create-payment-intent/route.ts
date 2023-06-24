import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma } from "#/db/db";
import ErrorHandler from "#/errors/ErrorHandler"
import { createLaundryItemIntent, createSubscriptionIntent } from "#/utils/stripe/data";
import { isAuthenticated } from "#/utils/auth";

interface RequestContext {
    // params: {
    //     id: string
    // }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router
    .post(async (req, ctx) => {
        try {
            const authed = await isAuthenticated(req)
            if (!authed) {
                return NextResponse.json({
                    success: false,
                    consoleError: "Unautorized payment attempt."
                })
            }
            const { quantity, subscription } = await req.json()
            if (!quantity && !subscription) {
                return NextResponse.json({
                    success: false,
                    consoleError: "No message was supplied to payment intent."
                })
            }
            if (!subscription) {
                const intent = await createLaundryItemIntent(parseInt(quantity))
                return NextResponse.json({
                    success: true,
                    intent: intent
                });
            }
            const user = await prisma.user.findFirst({
                where: {
                    username: authed
                }
            })
            if (!user) {
                return NextResponse.json({
                    success: false,
                    consoleError: "User not found."
                });
            }
            const intent = await createSubscriptionIntent(user)
            return NextResponse.json({
                success: true,
                intent: intent
            });
        } catch (err) {
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
