import { validateOrRedirect } from '#/utils/serverUtils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'


const ShowRefererCodePage = async () => {
    const valid = await validateOrRedirect()
    if (!valid.user) {
        redirect(valid.redirectPath || "/")
    }

    return (
        <div className={'w-full flex flex-col justify-center items-center'}>
            <Image src={`/api/refererQr`} width={500} height={500} alt="Referer Link" />
        </div>
    )
}


ShowRefererCodePage.displayName = "ShowRefererCodePage"


export default ShowRefererCodePage;
