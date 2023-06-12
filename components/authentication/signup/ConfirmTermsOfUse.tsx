"use client"
import React, { ChangeEventHandler } from 'react'
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import ModalToggleText from '../../ui/modals/ModalToggleText';



interface ConfirmTermsOfUseProps {
    onChange: (e: CheckboxChangeEvent) => void
    value: boolean
}

const ConfirmTermsOfUse = ({ value, onChange }: ConfirmTermsOfUseProps) => {
    return (
        <div className={'w-full my-2 grid gap-2'} style={{
            gridTemplateColumns: "auto 1fr"
        }}>
            <Checkbox checked={value} onChange={onChange} name="agreeToTerms" id="confirm-terms-cb" />
            <div className={'font-thin'}>
                I have read and agreed to the <ModalToggleText modalName="termsOfService" bold primary>Terms of Service</ModalToggleText> and <ModalToggleText modalName="privacy" bold primary>Privacy Policy.</ModalToggleText>
            </div>
        </div>
    )
}



export default ConfirmTermsOfUse;
