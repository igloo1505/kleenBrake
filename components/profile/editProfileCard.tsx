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
import store from '#/state/store';
import { showToast } from '#/state/slices/ui';
import EditProfileContent from './editProfileContent';

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
        if (res.data.success) {
            store.dispatch(showToast({
                isOpen: true,
                content: "Your profile was update successfully!",
                severity: "success",
                timeout: 3000
            }))
            setTimeout(() => {
                window.location.pathname = user.id ? `/dashboard/${user.id}` : "/"
            }, 3000)
        }
    }


    const handlePaymentInfoChange = (e: InputMaskChangeEvent) => {
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
                <EditProfileContent
                    formData={formData}
                    handlePaymentInfoString={handlePaymentInfoString}
                    setFormData={setFormData}
                    handlePaymentInfoChange={handlePaymentInfoChange}
                    handleMaskedComplete={handleMaskedComplete}
                />
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
