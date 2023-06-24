import { stripe } from "#/db/db"
import { User } from "@prisma/client"
import Stripe from "stripe"

const subscriptionProductId = "figureThisOut"
const laundryServiceProductId = "figureThisOut"
export const subscriptionCost = 5000
export const laundryServiceCost = 500


export const getSubscriptionItem = () => {
    return {
        create: {
            name: "KleenBrake Subscription",
            description: "$50/Month KleenBrake Subscription"
        },
        item: {
            unit_amount: 5000,
            currency: "usd",
            recurring: {
                interval: "month"
            },
            product: subscriptionProductId
        }
    }
}


export const getLaundryServiceItem = (_n: number) => {
    const n = parseInt(`${_n}`)
    return {
        create: {
            name: "Laundry Service",
            description: "KleenBrake Laundry Service"
        },
        item: {
            unit_amount: laundryServiceCost * n,
            currency: 'usd',
            product: laundryServiceProductId
        }
    }
}


export const getLaundryServiceSession = async (stripe: Stripe, user: User, host: string) => {
    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        customer_email: user.email,
        subscription_data: {

        },
        payment_method_types: ["card"],
        ...(user.stripeId && { customer: user.stripeId }),
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "KleenBrake Subscription"
                    },
                    recurring: {
                        interval: "month"
                    },
                    unit_amount: subscriptionCost
                },
                quantity: 1
            },
        ],
        success_url: `${host}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${host}/canceled.html`,
        // automatic_tax: {enabled: true},
    });
    return session
}


export const createLaundryItemIntent = async (n: number = 1) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: laundryServiceCost * n,
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    return paymentIntent
}


export const createSubscriptionIntent = async (user: User) => {
    // const customer = await stripe.customers.create({
    //     email: user.email
    // })
    const paymentIntent = await stripe.paymentIntents.create({
        amount: subscriptionCost,
        currency: "usd",
        // customer: customer.id,
        setup_future_usage: "off_session",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    return paymentIntent
}
