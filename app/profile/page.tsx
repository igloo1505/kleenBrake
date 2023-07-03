import { prisma } from '#/db/db'
import { validateFromCookieValues } from '#/utils/auth'
import { getSubscription, getSubscriptionStatus } from '#/utils/serverUtils'
import ProfileSummary from '@/profile/ProfileSummary'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'



const ProfilePage = async () => {
    const cookieJar = cookies()
    const authToken = cookieJar.get("auth")?.value
    const userId = cookieJar.get("userId")?.value
    if (!userId || !authToken) {
        return redirect("/")
    }
    const isAuthed = await validateFromCookieValues(userId, authToken)
    if (!isAuthed) {
        return redirect("/")
    }
    const user = await prisma.user.findFirst({
        where: {
            username: userId
        },
        include: {
            dashboard: true
        }
    })
    if (!user) {
        return redirect("/")
    }
    let subscription;
    if (user.subscriptionId) {
        subscription = await getSubscription(user.subscriptionId)
    }
    return (
        <div className={'px-8 py-8 flex flex-col justify-center items-center'}>
            <ProfileSummary user={user} subscription={subscription} />
        </div>
    )
}


ProfilePage.displayName = "ProfilePage"


export default ProfilePage;
