import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { NewUserData } from "state/types/AuthTypes";
import { prisma } from "db/db";
import { decryptToken } from "#/utils/auth";
import { TransactionSubmission } from "#/types/PrismaGeneratorTypes";

interface RequestContext {
    // params: {
    //     id: string
    // }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router
    .post(async (req, ctx) => {
        try {
            const body: TransactionSubmission = await req.json()
            const authToken = req.cookies.get('auth')?.value
            const id = req.cookies.get('userId')?.value
            if (!authToken) {
                return NextResponse.json({ success: false, publicError: "User is not authenticated." })
            }
            const token = await decryptToken(authToken)
            if (!token || !id || token.payload.userId !== id) {
                return NextResponse.json({ success: false, publicError: "Not properly authenticated to handle that transaction." })
            }
            const user = await prisma.user.findFirst({
                where: {
                    id: parseInt(id)
                },
                include: {
                    dashboard: {
                        include: {
                            transactions: true
                        }
                    }
                }
            })
            if (!user || !user.dashboard) {
                return NextResponse.json({ success: false, error: "User not found" })
            }
            const transaction = await prisma.transaction.create({
                data: {
                    price: body.price,
                    dashboardId: user?.dashboardId
                }
            })
            const userData = {
                ...user,
                dashboard: {
                    ...user.dashboard,
                    transactions: [...user.dashboard.transactions, transaction]
                }
            }
            return NextResponse.json({
                updatedUser: userData,
                success: true
            });
        } catch {
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
