"use client"
import TextInput from '@/io/TextInput';
import { InputMaskChangeEvent, InputMaskCompleteEvent } from 'primereact/inputmask'
import { Dashboard, User } from '@prisma/client';
import { Dropdown } from 'primereact/dropdown'
import React, { ChangeEventHandler, useState } from 'react'
import InputMask from '@/io/InputMask';
import { days, months, parseEditProfileFormData } from '#/utils/dateStuff';
import axios from 'axios';
import { defaultAxiosConfig } from '#/state/types/NetworkTypes';

const cardNumberId = "card-container-id"

interface Props {
    user: (User & { dashboard: Dashboard }),
}



export interface EditProfileFormData {
    email: string
    payment: {

        cardNumber: string | undefined
        securityNumber: string | undefined
        expiration: {
            month: string,
            day: string
        }
    }
}

const EditProfileCard = ({ user }: Props) => {
    const [formData, setFormData] = useState<EditProfileFormData>({
        email: user.email,
        payment: {
            cardNumber: "",
            securityNumber: "",
            expiration: {
                month: months[0].label,
                day: days[0].label
            }
        }
    })

    const submitChange = async () => {
        const newData = parseEditProfileFormData(formData)
        const res = await axios.put("/api/edit/profile", newData, defaultAxiosConfig)
    }

    const handleChange: ChangeEventHandler = (e) => {
        const target = e.target as HTMLInputElement
        setFormData({
            ...formData,
            [target.name]: target.value
        })

    }

    const handleCardNumber = (e: InputMaskChangeEvent) => {
        console.log("inMaskChangeEvent: ", e)
        const target = e.target as HTMLInputElement
        /* console.log("e: ", e) */
        /* if (typeof e.value !== null && typeof e.value !== "undefined") { */
        /* } */
        setFormData({
            ...formData,
            [target.name]: e.value || ""
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
            [target.name]: e.value || ""
        })
    }

    return (
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
            <div className={'text-xl w-full text-center my-4 underline underline-offset-4 decoration-primary'}>Payment Information</div>
            <InputMask mask="999-999-9999" slotChar='x' id="card-number-input" label="Card Number" name="cardNumber" keyfilter={"int"} value={formData.payment.cardNumber} onChange={handleCardNumber} onComplete={handleMaskedComplete} />
            <div className={'mt-4 grid grid-cols-[1fr_260px] gap-4'}>
                <InputMask id="card-security-input" label="Card Security Number" keyfilter={"int"} name="securityNumber" value={formData.payment.securityNumber} mask="999" slotChar='x' onChange={handleCardNumber} onComplete={handleMaskedComplete} />
                <div className={'flex flex-col gap-2'}>
                    <label htmlFor='expiration-group'>Expiration</label>
                    <div className={'grid grid-cols-[1fr_auto] w-full gap-2 flex-nowrap place-self-center'} id="expiration-group">
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
        </div>

    )
}


EditProfileCard.displayName = "EditProfileCard"


export default EditProfileCard;
