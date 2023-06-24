import bcryptjs from 'bcrypt'
import { prisma, stripe } from '#/db/db'
import { audience, decryptToken, issuer, alg, validateFromCookieValues } from './auth'
import * as jose from 'jose'
import { NextApiRequest } from 'next'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Dashboard, User } from '@prisma/client'
import { CreateStripeCustomerType } from '#/state/types/AuthTypes'

const secret = new TextEncoder().encode(process.env.QR_SECRET!)

export const encryptPassword = async (pw: string) => {
    const salt = await bcryptjs.genSalt(10)
    const hashed = await bcryptjs.hash(pw, salt)
    return hashed
}

export const comparePasswords = async (inputPw: string, hashedPw: string) => {
    const match = await bcryptjs.compare(inputPw, hashedPw)
    return match
}


export const isAuthenticatedAdmin = async (req: NextApiRequest) => {
    let userId = req.cookies?.userId
    let auth = req.cookies?.auth
    if (!auth || !userId) {
        return false
    }
    const decrypted = await decryptToken(auth)
    if (!decrypted || !decrypted.payload.userId || decrypted.payload.userId !== userId) {
        return false
    }
    const user = await prisma.user.findFirst({
        where: {
            username: userId
        }
    })
    if (!user) {
        return false
    }
    return user.role === "ADMIN"
}


export const getQrData = async (transactionId: string, price: string | number) => {
    const jwt = await new jose.SignJWT({ transactionId: transactionId, price: price })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer(issuer)
        .setAudience(audience)
        .setExpirationTime('3d')
        .sign(secret)
    return jwt
}

export const acceptTransactionCode = async (transActionCode: string, userId: string | number) => {
    console.log("transActionCode, userId: ", transActionCode, userId)

}



export const validateOrRedirect = async (): Promise<{
    user: (User & { dashboard: Dashboard }) | null,
    redirectPath: false | null | string
    subscribed?: boolean | null
}> => {
    const cookieJar = cookies()
    const authToken = cookieJar.get("auth")?.value
    const userId = cookieJar.get("userId")?.value
    if (!userId || !authToken) {
        return {
            user: null,
            redirectPath: "/"
        }
    }
    const isAuthed = await validateFromCookieValues(userId, authToken)
    if (!isAuthed) {
        return {
            user: null,
            redirectPath: "/"
        }
    }
    const user = await prisma.user.findFirst({
        where: {
            username: userId
        },
        include: {
            dashboard: true
        }
    })
    // TODO: Handle getting subscription status here...
    const subscribed = false
    if (user) {
        return {
            user: user,
            redirectPath: false,
            subscribed: subscribed
        }
    }
    return {
        user: null,
        redirectPath: "/"
    }
}


export const getSubscriptionStatus = async (id: string): Promise<boolean> => {
    return false
}

export const getStripeCustomer = async (username: string, data: CreateStripeCustomerType) => {
    const user = await prisma.user.findFirst({
        where: {
            username: username
        },
        include: {
            dashboard: true
        }
    })
    if (!user) {
        return false
    }
    const customer = await stripe.customers.create({
        email: user.email,
        name: data.name,
    });
    return customer
}



