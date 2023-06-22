import { validateOrRedirect } from '#/utils/serverUtils'
import EditProfileCard from '@/profile/editProfileCard'
import { redirect } from 'next/navigation'
import React from 'react'



interface EditProfilePageProps {

}

const EditProfilePage = async (props: EditProfilePageProps) => {
    const { user, redirectPath } = await validateOrRedirect()
    if (redirectPath || !user) {
        return redirect(redirectPath || "/")
    }
    return (
        <div className={'w-full flex flex-col justify-center items-center'}>
            <EditProfileCard user={user} />
        </div>
    )

}


EditProfilePage.displayName = "EditProfilePage"


export default EditProfilePage;
