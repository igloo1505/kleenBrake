import { prisma } from '#/db/db'
import { validateFromCookieValues } from '#/utils/auth'
import { getSubscriptionStatus } from '#/utils/serverUtils'
import ProfileSummary from '@/profile/ProfileSummary'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'



const ProfilePage = async () => {
    const cookieJar = cookies()
    const authToken = cookieJar.get("auth")?.value
    const userId = cookieJar.get("userId")?.value
    console.log("userId: ", userId)
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
    return (
        <div className={'px-8 py-8 flex flex-col justify-center items-center'}>
            <ProfileSummary user={user} />
        </div>
    )
}


ProfilePage.displayName = "ProfilePage"


export default ProfilePage;
