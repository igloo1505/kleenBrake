import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import { validateFromCookieValues } from './auth'



export const getUserIdFromCookies = async () => {
    const cookieJar = cookies()
    const userId = cookieJar.get('userId')?.value
    const auth = cookieJar.get('auth')?.value
    if (!auth || !userId) {
        return false
    }
    let isValid = await validateFromCookieValues(userId, auth)
    if (isValid) {
        return userId
    }
}



export const checkAuthenticated = async (): Promise<boolean> => {
    const cookieJar = cookies()
    const userId = cookieJar.get('userId')?.value
    const auth = cookieJar.get('auth')?.value
    if (!auth || !userId) {
        return false
    }
    const isValid = await validateFromCookieValues(userId, auth)
    return isValid
}

