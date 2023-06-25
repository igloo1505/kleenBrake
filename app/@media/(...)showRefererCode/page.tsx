import ImageWithoutSrcParsed from '@/ui/ImageWithoutSrcParse'
import ImageModal from '@/ui/media/ImageModal'
import MediaModalWrapper from '@/ui/modals/MediaModalWrapper'
import { ImageLoaderProps } from 'next/image'
import React from 'react'


const TransactionQrModal = () => {
    return (
        <MediaModalWrapper>
            <ImageWithoutSrcParsed src="/api/refererQr" fill={true} alt="Referal Link" />
        </MediaModalWrapper>
    )
}


TransactionQrModal.displayName = "TransactionQrModal"


export default TransactionQrModal;
