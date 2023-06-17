import ImageModal from '@/ui/media/ImageModal'
import React from 'react'



interface TransactionQrModalProps {

}

const TransactionQrModal = (props: TransactionQrModalProps) => {
    return (
        <ImageModal url="/api/transactionQr/adfadfa" />
    )
}


TransactionQrModal.displayName = "TransactionQrModal"


export default TransactionQrModal;
