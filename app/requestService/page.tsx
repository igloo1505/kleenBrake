import RequestServiceForm from '@/requestService/requestServiceForm';
import React from 'react'



interface RequestServiceProps {

}

const RequestService = () => {
    return (
        <div className={'w-full flex flex-col justify-center items-center'}>
            <RequestServiceForm />
        </div>
    )
}


RequestService.displayName = "RequestService"


export default RequestService;
