"use client"
import { InputMaskChangeEvent, InputMaskCompleteEvent } from 'primereact/inputmask'
import { Dashboard, User } from '@prisma/client';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { days, months, parseEditProfileFormData } from '#/utils/dateStuff';
import axios from 'axios';
import { defaultAxiosConfig } from '#/state/types/NetworkTypes';
import { Checkbox } from 'primereact/checkbox';
import Button from '@/io/Button';
import AgreeToSubscribeModal from '@/legal/AgreeToSubscribeModal';
import store from '#/state/store';
import { setLoading, showToast } from '#/state/slices/ui';
import EditProfileContent from './editProfileContent';
import SubscribeModal from '@/legal/Subscribe';
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '@/payment/checkoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

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
        subscribed: boolean
    }
}

const EditProfileCard = ({ user }: Props) => {
    const [clientSecret, setClientSecret] = useState<{
        clientSecret: string,
        subscriptionId: string
    } | undefined>()
    const [isOpen, setIsOpen] = useState<{ open: boolean, hasOpened: boolean }>({
        open: false,
        hasOpened: false
    })
    const [subOpen, setSubOpen] = useState<boolean>(false)
    const [showCheckout, setShowCheckout] = useState(false)
    const setIntent = async () => {
        store.dispatch(setLoading(true))
        const res = await axios.post("/api/customer", {
            name: formData.payment.nameOnAccount,
        }, defaultAxiosConfig)
        const res2 = await axios.post("/api/create-subscription", null, defaultAxiosConfig)
        console.log("res: ", res)
        if (res2.data.success) {
            setClientSecret({
                clientSecret: res2.data.clientSecret,
                subscriptionId: res2.data.subscriptionId
            })
        }
        store.dispatch(setLoading(false))
        setShowCheckout(true)
    }
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
            agreeToTerms: false,
            subscribed: Boolean(user.subscriptionId)
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
                window.location.pathname = user.id ? `/dashboard` : "/"
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

    const toggleSubscription = () => {
        if (!formData.payment.subscribed) {
            setSubOpen(false)
            /* setShowCheckout(true) */
            setIntent()
        }
    }
    const launchSubscriptionModal = () => {
        setSubOpen(true)
    }

    useEffect(() => {
        if (typeof window === "undefined") return;
        let em = document.getElementById("toggle-subscription-input")
        em?.addEventListener("click", launchSubscriptionModal)
    }, [])

    const handleCheckout = () => {
        console.log("Handle checkout here...")
    }

    const stripeOptions: StripeElementsOptions = {
        clientSecret: clientSecret?.clientSecret,
    }

    const cancelSubscription = async () => {
        const res = await axios.post(`/api/cancel/${user.id}`)
    }

    return (
        <>
            <AgreeToSubscribeModal open={isOpen.open} setIsOpen={_setIsOpen} agree={agreeToTOS} />
            <SubscribeModal open={subOpen} setIsOpen={setSubOpen} toggleSubscriptionStatus={toggleSubscription} subscribed={formData.payment.subscribed} />
            {clientSecret && (
                <Elements options={stripeOptions} stripe={stripePromise}>
                    <CheckoutForm open={showCheckout} subscriptionId={clientSecret.subscriptionId} user={user} setIsOpen={setShowCheckout} checkout={handleCheckout} paymentPrefill={formData.payment} />
                </Elements>
            )}
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
                    <div className={'flex flex-row items-center justify-start mt-4'}>
                        <Checkbox checked={formData.payment.subscribed} id={'toggle-subscription-input'} name={"subscribed"} />
                        <label htmlFor={'toggle-subscription-input'} className="ml-2">{
                            formData.payment.subscribed ? "You are currently subscribed. Click to toggle your subscription status." : "You are currently not subscribed. Click to join KleenBrake."
                        }</label>
                    </div>
                </div>
                <div className={'w-full flex flex-row justify-end items-center mt-4'}>
                    <Button label="Update Profile" onClick={submitChange} />
                </div>
            </div>
        </>

    )
}


EditProfileCard.displayName = "EditProfileCard"


export default EditProfileCard;
