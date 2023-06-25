"use client"
import { setLoading, showToast } from '#/state/slices/ui';
import store from '#/state/store';
import { defaultAxiosConfig } from '#/state/types/NetworkTypes';
import Button from '@/io/Button';
import axios from 'axios';
import { InputNumber } from 'primereact/inputnumber';
import React, { useState } from 'react'
import CheckoutModal from './checkoutModal';
import { Dashboard, User } from '@prisma/client';
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PurchaseServiceFormProps {
    unitCost: number
    user: (User & { dashboard: Dashboard })
}

interface formDataType {
    quantity: number
    cost: number
}

const PurchaseServiceForm = ({ unitCost, user }: PurchaseServiceFormProps) => {
    const [clientSecret, setClientSecret] = useState<{
        clientSecret: string,
    } | undefined>()
    const [showCheckout, setShowCheckout] = useState(false)
    const [formData, setFormData] = useState<formDataType>({
        quantity: 1,
        cost: unitCost
    })

    if (!user.nameOnAccount) {
        store.dispatch(showToast({
            isOpen: true,
            content: "You must add a name to your account first. Please go to 'My Profile'."
        }))
    }


    const setIntent = async () => {
        store.dispatch(setLoading(true))
        await axios.post("/api/customer", null, defaultAxiosConfig)
        const res2 = await axios.post("/api/service/create", { quantity: formData.quantity }, defaultAxiosConfig)
        if (res2.data.success) {
            setClientSecret({
                clientSecret: res2.data.clientSecret,
            })
        }
        store.dispatch(setLoading(false))
        setShowCheckout(true)
    }

    const stripeOptions: StripeElementsOptions = {
        clientSecret: clientSecret?.clientSecret,
        appearance: {
            theme: "stripe"
        }
    }

    return (
        <>

            {clientSecret && (
                <Elements options={stripeOptions} stripe={stripePromise}>
                    <CheckoutModal open={showCheckout} quantity={formData.quantity} setIsOpen={setShowCheckout} user={user} />
                </Elements>
            )}
            <div className={'w-full px-6 py-6 mt-8 rounded-xl h-full transition-transform duration-500 flex flex-col items-center max-w-[80vw] md:max-w-[600px] bg-[--surface-card] gap-4'} style={{
                border: "1px solid var(--surface-border)"
            }}>
                <div className={'text-3xl text-center'}>KleenBrake Laundry Service</div>
                <div className={'text-xl'}>{`$${formData.cost.toFixed(2)}`}</div>
                <InputNumber className={'my-6 w-fit'} value={formData.quantity} min={0} onValueChange={(e) => {
                    const amount: number = typeof e.value === "undefined" ? formData.quantity : e.value as number
                    setFormData({
                        ...formData,
                        quantity: amount,
                        cost: amount * unitCost
                    })
                }} showButtons buttonLayout="horizontal" step={1}
                    decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                />
                <div className={'w-full flex flex-row justify-end items-center gap-4'}>
                    <Button label="Cancel" severity='danger' />
                    <Button label="Purchase" onClick={setIntent} />
                </div>
            </div>
        </>
    )
}


PurchaseServiceForm.displayName = "PurchaseServiceForm"


export default PurchaseServiceForm;
