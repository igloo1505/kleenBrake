import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import * as jose from 'jose'
export const issuer = 'pPlatform:issuer'
export const audience = 'pPlatform:audience'
export const alg = 'HS256'
const authTokenPath = 'auth'
const secret = new TextEncoder().encode(process.env.JWT_SECRET!)



const genToken = async (userId: string, rememberMe: boolean = false) => {
    const jwt = await new jose.SignJWT({ userId: userId })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer(issuer)
        .setAudience(audience)
        .setExpirationTime(rememberMe ? '7d' : '2h')
        .sign(secret)
    return jwt
}

export const decryptToken = async (authToken: string) => {
    try {

        const res = await jose.jwtVerify(authToken, secret, {
            issuer: issuer,
            audience: audience,
        })
        return res
    } catch {
        return false
    }
}

const verifyToken = async (authToken: string, userId: string): Promise<boolean> => {
    const token = await decryptToken(authToken)
    if (!token) {
        return false
    }
    return (token.payload.userId === userId) && (typeof token.payload?.exp !== "undefined") && (token.payload?.exp >= Date.now() / 1000)
}


export const validateFromCookieValues = async (userId: string, authToken: string) => {
    const isValid = await verifyToken(authToken, userId)
    return isValid
}


const isValidToken = async (req: NextRequest, userId: string) => {
    let token = req.cookies.get(authTokenPath)?.value
    if (!token) {
        return false
    }
    let valid = await verifyToken(token, userId)
    return valid ? userId : false
}

export const isAuthenticated = async (req: NextRequest) => {
    let userId = req.cookies.get('userId')?.value
    let validToken: number | string | undefined | boolean = false
    if (userId) {
        validToken = await isValidToken(req, userId)
    }
    return validToken
}


export const setToken = async (req: NextRequest, res: NextResponse, userId?: string, rememberMe: boolean = false): Promise<NextResponse> => {
    let id = req.cookies.get('userId')?.value || userId
    if (!id) return res;
    res.cookies.set('userId', id)
    const token = await genToken(id, rememberMe)
    res.cookies.set(authTokenPath, token)
    res.cookies.set("rememberMe", rememberMe === true ? "true" : "false")
    return res
}

export const clearTokens = async (res: NextResponse) => {
    res.cookies.delete('userId')
    res.cookies.delete('auth')
    // res.cookies.set({
    //     name: 'userId',
    //     value: '',
    //     expires: Date.now()
    // });
    // res.cookies.set({
    //     name: 'auth',
    //     value: '',
    //     expires: Date.now()
    // })
    return res
}

export const refreshTokens = async (req: NextRequest, res: NextResponse) => {
    const userId = req.cookies.get("userId")?.value
    let remember = req.cookies.get("rememberMe")?.value
    let rememberMe = remember === "true" ? true : false
    if (userId) {
        res.cookies.set("userId", userId)
        const token = await genToken(userId, rememberMe)
        res.cookies.set("auth", token)
    }
    return res
}


