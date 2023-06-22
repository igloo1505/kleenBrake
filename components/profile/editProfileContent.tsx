"use client"
import TextInput from '@/io/TextInput'
import React, { ChangeEvent } from 'react'
import { EditProfileFormData } from './editProfileCard'
import InputMask from '@/io/InputMask'
import { InputMaskChangeEvent, InputMaskCompleteEvent } from 'primereact/inputmask'
import { Dropdown } from 'primereact/dropdown'
import { days, months } from '#/utils/dateStuff'



interface EditProfileContentProps {
    formData: EditProfileFormData
    setFormData: (d: EditProfileFormData) => void
    handlePaymentInfoString: (e: ChangeEvent) => void
    handlePaymentInfoChange: (e: InputMaskChangeEvent) => void
    handleMaskedComplete: (e: InputMaskCompleteEvent) => void
    disabled?: boolean
}

const EditProfileContent = ({ formData, disabled, handlePaymentInfoChange, handleMaskedComplete, setFormData, handlePaymentInfoString }: EditProfileContentProps) => {
    return (
        <>
            <TextInput label="Email" name="email" disabled={disabled} keyfilter={"email"} value={formData.email} onChange={(e) => {
                const target = e.target as HTMLInputElement
                setFormData({
                    ...formData,
                    email: target.value
                })
            }} />
            <div className={'text-2xl w-full text-center my-4 underline underline-offset-4 decoration-primary'}>Payment Information</div>
            <TextInput label="Name on Account" disabled={disabled} name="nameOnAccount" value={formData.payment.nameOnAccount || ""} onChange={handlePaymentInfoString} />
            <InputMask className={'mt-4'} mask="999-999-9999" disabled={disabled} slotChar='x' id="card-number-input" label="Card Number" name="cardNumber" keyfilter={"int"} value={formData.payment.cardNumber} onChange={handlePaymentInfoChange} onComplete={handleMaskedComplete} />
            <div className={'mt-4 grid grid-cols-[1fr_260px] gap-4'}>
                <InputMask id="card-security-input" label="Card Security Number" disabled={disabled} keyfilter={"int"} name="securityNumber" value={formData.payment.securityNumber} mask="999" slotChar='x' onChange={handlePaymentInfoChange} onComplete={handleMaskedComplete} />
                <div className={'flex flex-col gap-2'}>
                    <label htmlFor='expiration-group'>Expiration</label>
                    <div className={'grid grid-cols-[1fr_100px] w-full gap-2 flex-nowrap place-self-center'} id="expiration-group">
                        <Dropdown className={'w-full'} disabled={disabled} dataKey='month-' options={months} value={formData.payment.expiration.month} onChange={(e) => {
                            setFormData({
                                ...formData,
                                payment: {
                                    ...formData.payment,
                                    expiration: {
                                        ...formData.payment.expiration,
                                        month: e.target.value
                                    }
                                }
                            })
                        }} />
                        <Dropdown className={'w-full'} options={days} disabled={disabled} dataKey='day-' value={formData.payment.expiration.day} onChange={(e) => {
                            setFormData({
                                ...formData,
                                payment: {
                                    ...formData.payment,
                                    expiration: {
                                        ...formData.payment.expiration,
                                        day: e.target.value
                                    }
                                }
                            })
                        }} />
                    </div>
                </div>
            </div>
        </>
    )
}


EditProfileContent.displayName = "EditProfileContent"


export default EditProfileContent;
