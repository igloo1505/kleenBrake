import RequestServiceForm from '@/requestService/requestServiceForm';
import MediaModalWrapper from '@/ui/modals/MediaModalWrapper';
import React from 'react'



interface RequestServiceModalProps {

}

const RequestServiceModal = () => {
    return (
        <MediaModalWrapper>
            <RequestServiceForm />
        </MediaModalWrapper>
    )
}


RequestServiceModal.displayName = "RequestServiceModal"


export default RequestServiceModal;
