import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma } from "#/db/db";
import { RequestServiceFormData } from "#/types/jobTypes";

interface RequestContext {
    // params: {
    //     id: string
    // }
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router
    .post(async (req, ctx) => {
        try {
            const { data }: { data: RequestServiceFormData } = await req.json()
            const locationExists = await prisma.location.findFirst({
                where: {
                    AND: {
                        street: {
                            equals: data.location.street,
                        },
                        zip: {
                            equals: data.location.zip || undefined
                        },
                    }
                }
            })
            const newJob = await prisma.job.create({
                data: {
                    message: data.message,
                    quantity: data.quantity,
                    pickupWindow: {
                        create: {
                            start: data.pickupWindow.start,
                            end: data.pickupWindow.end,
                        }
                    },
                    dropOffWindow: {
                        create: {
                            start: data.returnWindow.start,
                            end: data.returnWindow.end,
                        }
                    },
                    location: {
                        connectOrCreate: {
                            where: {
                                id: locationExists?.id || -1
                            },
                            create: {
                                street: data.location.street,
                                zip: data.location.zip,
                                city: data.location.city,
                                state: data.location.state || "IL",
                                unit: data.location.unit,
                                entryCode: data.location.entryCode ? `${data.location.entryCode}` : null
                            }
                        }
                    }
                },
                include: {
                    pickupWindow: true,
                    dropOffWindow: true,
                    location: true
                }
            }
            )
            // TODO: Make sure this gets appended to appropriate account if the created job is a success

            return NextResponse.json({
                success: true,
                job: newJob
            });
        } catch (err) {
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
