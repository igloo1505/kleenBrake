import type { NextFetchEvent, NextRequest } from "next/server";
import type { NewUserData } from "../../../../state/types/AuthTypes";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { prisma } from "../../../../db/db";
import { encryptPassword } from "../../../../utils/serverUtils";
import { setToken } from "../../../../utils/auth";
import { ROLE, User } from "@prisma/client";

interface RequestContext {
    // user: NewUserData
}

const router = createEdgeRouter<NextRequest, RequestContext>();


router
    .post(async (req) => {
        try {
            const json = await req.json()
            const user: (NewUserData & { role?: ROLE }) = json.user
            const hashedPassword = await encryptPassword(user.password)
            let refererId = user.refererId || req.cookies.get("refererId")?.value || false
            if (!user.agreeToTerms || !user.confirmAge) {
                return NextResponse.json({ success: false, publicError: "You must agree to the terms of service and confirm your age to register." })
            }
            let parent: null | User = null
            if (refererId) {
                parent = await prisma.user.findFirst({
                    where: {
                        id: parseInt(`${refererId}`)
                    }
                })
            }
            const dashboard = await prisma.dashboard.create({
                data: {}
            })
            let newLineage;
            if (!parent) {
                newLineage = await prisma.lineage.create({
                    data: {
                        familyTree: {
                            connectOrCreate: {
                                where: {
                                    id: 1
                                },
                                create: {}
                            }
                        }
                    }
                })
            }
            const newUser = await prisma.user.create({
                data: {
                    username: user.username,
                    email: user.email,
                    password: hashedPassword,
                    ...(user.role && { role: user.role }),
                    ...(parent && {
                        parent: {
                            connect: {
                                id: parent.id
                            }
                        }
                    }),
                    dashboard: {
                        connect: {
                            id: dashboard.id
                        }
                    },
                    lineage: {
                        connect: {
                            id: parent?.lineageId || newLineage?.id || 1
                        }
                    }
                }
            })

            let updatedParent;
            if (refererId) {
                const parent = await prisma.user.findFirst({
                    where: {
                        id: parseInt(`${refererId}`)
                    },
                    include: {
                        children: true
                    }
                })
                if (parent) {
                    updatedParent = await prisma.user.update({
                        where: {
                            id: parent.id
                        },
                        data: {
                            children: {
                                connect: [...parent.children, newUser].map((c) => ({
                                    id: c.id
                                }))
                            }
                        }
                    })
                }
            }
            let res = NextResponse.json({ newUser: newUser, updatedParent: updatedParent, success: true });
            res = await setToken(req, res, newUser.username)
            return res
        } catch (err) {
            // TODO: Handle errors appropriately in a bit...
            console.error(err)
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
