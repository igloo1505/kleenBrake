import { getSubscription, validateOrRedirect } from '#/utils/serverUtils'
import EditProfileCard from '@/profile/editProfileCard'
import { redirect } from 'next/navigation'
import React from 'react'



const EditProfilePage = async () => {
    const { user, redirectPath } = await validateOrRedirect()
    if (redirectPath || !user) {
        return redirect(redirectPath || "/")
    }
    let subscription;
    if (user.subscriptionId) {
        subscription = await getSubscription(user.subscriptionId)
    }
    return (
        <div className={'w-full flex flex-col justify-center items-center'}>
            <EditProfileCard user={user} subscription={subscription} />
        </div>
    )

}


EditProfilePage.displayName = "EditProfilePage"


export default EditProfilePage;
