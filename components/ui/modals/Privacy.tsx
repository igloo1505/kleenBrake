import React from 'react'
import ModalWrapper from './ModalWrapper';



interface PrivacyModalProps {
    open: boolean
}

const PrivacyModal = ({ open }: PrivacyModalProps) => {
    return (
        <ModalWrapper open={open} title="Privacy Policy">
            Privacy policy will go here.
        </ModalWrapper>
    )
}



export default PrivacyModal;
