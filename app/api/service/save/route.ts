import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma } from "#/db/db";
import ErrorHandler from "#/errors/ErrorHandler"
import { isAuthenticated } from "#/utils/auth";
import { getServicePurchase } from "#/utils/serverUtils";

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
            const paymentId = req.cookies.get("paymentId")?.value
            if (!paymentId) {
                return NextResponse.json({
                    success: false,
                    consoleError: "No paymentId found."
                })
            }
            if (!authed) {
                return NextResponse.json({
                    success: false,
                    consoleError: "Unuthorized."
                })
            }
            const user = await prisma.user.findFirst({
                where: {
                    username: authed
                }
            })
            if (!user) {
                return NextResponse.json({
                    success: false,
                    consoleError: "No user found."
                })
            }
            const purchase = await getServicePurchase(paymentId)
            const transaction = await prisma.transaction.create({
                data: {
                    paymentId: paymentId,
                    price: purchase.amount,
                    dashboardId: user?.dashboardId
                }
            })
            const res = NextResponse.json({
                success: true,
                transaction: transaction
            });
            res.cookies.delete("paymentId")
            return res
        } catch (err) {
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
