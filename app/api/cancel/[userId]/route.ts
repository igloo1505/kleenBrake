import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma, stripe } from "#/db/db";
import ErrorHandler from "#/errors/ErrorHandler"
import { isAuthenticated } from "#/utils/auth";

interface RequestContext {
    params: {
        userId: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router
    // middleware
    // .use(async (req, event, next) => {
    //   const start = Date.now();
    //   await next(); // call next in chain
    //   const end = Date.now();
    //   console.log(`Request took ${end - start}ms`);
    // })

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
            if (!user || !user.subscriptionPM) {
                return NextResponse.json({
                    success: false,
                    publicError: "An error occurred. Please try logging in again."
                })
            }

            // const subscription = await stripe.subscriptions.update(
            //     'sub_49ty4767H20z6a',
            //     {
            //         cancel_at_period_end: true,
            //     }
            // );
            return NextResponse.json({});
        } catch (err) {
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
