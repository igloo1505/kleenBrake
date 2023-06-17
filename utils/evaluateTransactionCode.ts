import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { decryptToken } from "./auth"
import { acceptTransactionCode } from "./serverUtils"

export const evaluateTransactionCode = async (transactionCode: string) => {
    const cookieJar = cookies()
    const userId = cookieJar.get("userId")?.value
    const authToken = cookieJar.get("auth")?.value
    if (!userId || !authToken) {
        redirect("/login")
    }
    const decryptedAuth = await decryptToken(authToken)
    if (!decryptedAuth || decryptedAuth.payload.userId !== userId) {
        redirect("/")
    }
    const acceptedData = await acceptTransactionCode(transactionCode, userId)
    return acceptedData
}
