import { getServiceItemDetails, validateOrRedirect } from '#/utils/serverUtils';
import PurchaseServiceForm from '@/payment/purchaseService';
import MediaModalWrapper from '@/ui/modals/MediaModalWrapper';
import React from 'react'



interface PurchaseServiceModalProps {

}

const PurchaseServiceModal = async (props: PurchaseServiceModalProps) => {
    const service = await getServiceItemDetails()
    const authed = await validateOrRedirect()
    if (!service?.unit_amount || !authed.user) {
        console.log("No service found.")
        return null
    }
    return (
        <div className={'w-full flex flex-col justify-center items-center'}>
            <MediaModalWrapper>
                <PurchaseServiceForm unitCost={service?.unit_amount / 100} user={authed.user} />
            </MediaModalWrapper>
        </div>
    )
}


PurchaseServiceModal.displayName = "PurchaseServiceModal"


export default PurchaseServiceModal;
