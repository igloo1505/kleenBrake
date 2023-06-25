import ImageModal from '@/ui/media/ImageModal'
import { ImageLoaderProps } from 'next/image'
import React from 'react'


const TransactionQrModal = () => {
    const loader = ({ src }: ImageLoaderProps) => `${src}`
    return (
        <ImageModal url='/api/refererQr' loader={loader} />
    )
}


TransactionQrModal.displayName = "TransactionQrModal"


export default TransactionQrModal;
