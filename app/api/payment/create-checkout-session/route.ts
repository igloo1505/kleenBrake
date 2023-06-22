import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { stripe, prisma } from "db/db";
import { cookies } from "next/headers";
import { isAuthenticated } from "#/utils/auth";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";

interface RequestContext {
    // params: {
    //     id: string
    // }
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
            // BUG: Come back and get the proper env variable here for Next.js.
            // I can't remember what the proper env variable is called and I'm not on WIFI.
            const domainURL = process.env.DOMAIN;
            const body = await req.json()
            const authed = await isAuthenticated(req)
            if (!authed) {
                return NextResponse.json({
                    success: false,
                    publicError: "You must be authenticated to perform that action."
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
                    publicError: "User data not found"
                })
            }

            const { quantity } = body;

            // Create new Checkout Session for the order
            // Other optional params include:
            // [billing_address_collection] - to display billing address details on the page
            // [customer] - if you have an existing Stripe Customer ID
            // [customer_email] - lets you prefill the email input in the Checkout page
            // [automatic_tax] - to automatically calculate sales tax, VAT and GST in the checkout page
            // For full details see https://stripe.com/docs/api/checkout/sessions/create
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                customer_email: user.email,
                ...(user.stripeId && { customer: user.stripeId }),
                line_items: [
                    {
                        price: process.env.PRICE,
                        quantity: quantity
                    },
                ],
                // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
                success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${domainURL}/canceled.html`,
                // automatic_tax: {enabled: true},
            });
            if (session.customer && !user.stripeId) {
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        stripeId: typeof (session.customer) === "string" ? session.customer : session.customer?.id
                    }
                })
            }
            if (!session.url) {
                return NextResponse.json({
                    success: true,
                    session: session
                });
            }

            return redirect(session.url, RedirectType.push)
        } catch {
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
