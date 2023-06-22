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

    .post(async (req, ctx) => {
        try {
            const body = await req.json()
            let data;
            let eventType;
            // Check if webhook signing is configured.
            if (process.env.STRIPE_WEBHOOK_SECRET) {
                // Retrieve the event by verifying the signature using the raw body and secret.
                let event;
                let signature = req.headers.get('stripe-signature')
                // let signature = req.headers['stripe-signature'];
                if (!signature) {
                    return NextResponse.json({
                        success: false,
                        consoleError: "No stripe signature found"
                    })
                }

                try {
                    event = stripe.webhooks.constructEvent(
                        JSON.stringify(body),
                        signature,
                        process.env.STRIPE_WEBHOOK_SECRET
                    );
                } catch (err) {
                    console.log(`⚠️  Webhook signature verification failed.`);
                    return NextResponse.json({ success: false }, {
                        status: 400
                    })
                }
                // Extract the object from the event.
                data = event.data;
                eventType = event.type;
            } else {
                // Webhook signing is recommended, but if the secret is not configured in `config.js`,
                // retrieve the event data directly from the request body.
                data = body;
                eventType = body.type;
            }

            if (eventType === 'checkout.session.completed') {
                console.log(`🔔  Payment received!`);
            }
            return NextResponse.json({
                success: true
            }, {
                status: 200
            })
        } catch {
            return NextResponse.json({ success: false });
        }
    })


export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
