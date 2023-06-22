import ImageModal from '@/ui/media/ImageModal'
import React from 'react'


const TransactionQrModal = () => {
    return (
        <ImageModal url='/api/refererQr' />
    )
}


TransactionQrModal.displayName = "TransactionQrModal"


export default TransactionQrModal;
