"use client"
import TextInput from '@/io/TextInput';
import { InputMaskChangeEvent, InputMaskCompleteEvent } from 'primereact/inputmask'
import { Dashboard, User } from '@prisma/client';
import { Dropdown } from 'primereact/dropdown'
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import InputMask from '@/io/InputMask';
import { days, months, parseEditProfileFormData } from '#/utils/dateStuff';
import axios from 'axios';
import { defaultAxiosConfig } from '#/state/types/NetworkTypes';
import { Checkbox } from 'primereact/checkbox';
import Button from '@/io/Button';
import AgreeToSubscribeModal from '@/legal/AgreeToSubscribeModal';

const cardNumberId = "card-container-id"

interface Props {
    user: (User & { dashboard: Dashboard }),
}



export interface EditProfileFormData {
    email: string
    payment: {
        nameOnAccount: string | undefined
        cardNumber: string | undefined
        securityNumber: string | undefined
        expiration: {
            month: string,
            day: string
        },
        agreeToTerms: boolean
    }
}

const EditProfileCard = ({ user }: Props) => {
    const [isOpen, setIsOpen] = useState<{ open: boolean, hasOpened: boolean }>({
        open: false,
        hasOpened: false
    })
    const [formData, setFormData] = useState<EditProfileFormData>({
        email: user.email,
        payment: {
            nameOnAccount: "",
            cardNumber: "",
            securityNumber: "",
            expiration: {
                month: months[0].label,
                day: days[0].label
            },
            agreeToTerms: false
        }
    })

    const submitChange = async () => {
        const newData = parseEditProfileFormData(formData)
        const res = await axios.put("/api/edit/profile", newData, defaultAxiosConfig)
        console.log("res: ", res)
    }


    const handlePaymentInfoChange = (e: InputMaskChangeEvent) => {
        console.log("inMaskChangeEvent: ", e)
        const target = e.target as HTMLInputElement
        setFormData({
            ...formData,
            payment: {
                ...formData.payment,
                [target.name]: e.value || ""
            }
        })
    }

    const handlePaymentInfoString = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement
        setFormData({
            ...formData,
            payment: {
                ...formData.payment,
                [target.name]: target.value || ""
            }
        })
    }

    const handleMaskedComplete = (e: InputMaskCompleteEvent) => {
        console.log("In mask complete: ", e)
        const target = e.originalEvent?.target as HTMLInputElement
        if (!target) {
            return console.log("No target found")
        }
        setFormData({
            ...formData,
            payment: {
                ...formData.payment,
                [target.name]: e.value || ""
            }
        })
    }

    const _setIsOpen = (val: boolean) => {
        setIsOpen({
            open: val,
            hasOpened: true
        })
    }

    const agreeToTOS = () => {
        setFormData({
            ...formData,
            payment: {
                ...formData.payment,
                agreeToTerms: true
            }
        })
        _setIsOpen(false)
    }

    return (
        <>
            <AgreeToSubscribeModal open={isOpen.open} setIsOpen={_setIsOpen} agree={agreeToTOS} />
            <div className={'w-full px-6 py-6 mt-8 rounded-xl h-full transition-transform duration-500 flex flex-col gap-2 max-w-[80vw] md:max-w-[600px] bg-[--surface-card]'} style={{
                border: "1px solid var(--surface-border)"
            }}>
                <TextInput label="Email" name="email" keyfilter={"email"} value={formData.email} onChange={(e) => {
                    const target = e.target as HTMLInputElement
                    setFormData({
                        ...formData,
                        email: target.value
                    })
                }} />
                <div className={'text-2xl w-full text-center my-4 underline underline-offset-4 decoration-primary'}>Payment Information</div>
                <TextInput label="Name on Account" name="nameOnAccount" value={formData.payment.nameOnAccount || ""} onChange={handlePaymentInfoString} />
                <InputMask className={'mt-4'} mask="999-999-9999" slotChar='x' id="card-number-input" label="Card Number" name="cardNumber" keyfilter={"int"} value={formData.payment.cardNumber} onChange={handlePaymentInfoChange} onComplete={handleMaskedComplete} />
                <div className={'mt-4 grid grid-cols-[1fr_260px] gap-4'}>
                    <InputMask id="card-security-input" label="Card Security Number" keyfilter={"int"} name="securityNumber" value={formData.payment.securityNumber} mask="999" slotChar='x' onChange={handlePaymentInfoChange} onComplete={handleMaskedComplete} />
                    <div className={'flex flex-col gap-2'}>
                        <label htmlFor='expiration-group'>Expiration</label>
                        <div className={'grid grid-cols-[1fr_100px] w-full gap-2 flex-nowrap place-self-center'} id="expiration-group">
                            <Dropdown className={'w-full'} options={months} value={formData.payment.expiration.month} onChange={(e) => {
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
                            <Dropdown className={'w-full'} options={days} value={formData.payment.expiration.day} onChange={(e) => {
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
                <div>
                    <div className={'flex flex-row items-center justify-start mt-4'}>
                        <Checkbox checked={formData.payment.agreeToTerms} onChange={() => {
                            if (!isOpen.hasOpened) {
                                return _setIsOpen(true)
                            }
                            if (isOpen.hasOpened) {
                                setFormData({
                                    ...formData,
                                    payment: {
                                        ...formData.payment,
                                        agreeToTerms: !formData.payment.agreeToTerms
                                    }
                                })
                            }

                        }} inputId={'agree-to-terms-input'} name={"agreeToTerms"} />
                        <label htmlFor={'agree-to-terms-input'} className="ml-2">I have read and agree to the terms of service.</label>
                    </div>
                </div>
                <div className={'w-full flex flex-row justify-end items-center'}>
                    <Button label="Update Profile" onClick={submitChange} />
                </div>
            </div>
        </>

    )
}


EditProfileCard.displayName = "EditProfileCard"


export default EditProfileCard;
