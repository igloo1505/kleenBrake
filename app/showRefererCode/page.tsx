import { validateOrRedirect } from '#/utils/serverUtils';
import ImageWithoutSrcParsed from '@/ui/ImageWithoutSrcParse';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'


const ShowRefererCodePage = async () => {
    const valid = await validateOrRedirect()
    if (!valid.user) {
        redirect(valid.redirectPath || "/")
    }

    return (
        <div className={'w-full flex justify-center items-center'}>
            <div className={'relative w-full flex flex-col justify-center items-center max-w-[min(500px,80vw)] h-[min(80vh,450px)] max-h-[calc(100vh-8rem)]'}>
                <ImageWithoutSrcParsed src={`/api/refererQr`} fill={true} alt="Referer Link" />
            </div>
        </div>
    )
}


ShowRefererCodePage.displayName = "ShowRefererCodePage"


export default ShowRefererCodePage;
