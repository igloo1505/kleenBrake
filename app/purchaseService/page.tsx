import { showToast } from '#/state/slices/ui';
import store from '#/state/store';
import { getServiceItemDetails, validateOrRedirect } from '#/utils/serverUtils';
import PurchaseServiceForm from '@/payment/purchaseService';
import React from 'react'



interface PruchaseServicePageProps {

}

const PurchaseServicePage = async (props: PruchaseServicePageProps) => {
    const service = await getServiceItemDetails()
    const authed = await validateOrRedirect()
    if (!service?.unit_amount || !authed.user) {
        console.log("No service found.")
        return null
    }
    if (!authed.user.nameOnAccount) {
        store.dispatch(showToast({
            isOpen: true,
            content: "You must add a name to your account first. Please go to 'My Profile'."
        }))
    }
    return (
        <div className={'w-full flex flex-col justify-center items-center'}>
            <PurchaseServiceForm unitCost={service?.unit_amount / 100} user={authed.user} />
        </div>
    )
}


PurchaseServicePage.displayName = "PurchaseServicePage"


export default PurchaseServicePage;
