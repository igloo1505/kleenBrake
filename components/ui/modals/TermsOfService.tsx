import React from 'react'
import ModalWrapper from './ModalWrapper';



interface TermsOfServiceProps {
    open: boolean
}

const TermsOfService = ({ open }: TermsOfServiceProps) => {
    return (
        <ModalWrapper open={open} title="Terms of Service">
            Terms of Service will go here.
        </ModalWrapper>
    )
}



export default TermsOfService;
