"use client"
import { RequestServiceFormData } from '#/types/jobTypes'
import React, { useState } from 'react'
import RequestFormOne from './stepOne'
import RequestServiceFormTwo from './stepTwo'
import RequestServiceFormMessage from './serviceFormMessage'
import Button from '@/io/Button'
import { defaultAxiosConfig } from '#/state/types/NetworkTypes'
import axios from 'axios'
import store from '#/state/store'
import { showToast } from '#/state/slices/ui'
import { useRouter } from 'next/navigation'

const maxStep = 4

const RequestServiceForm = () => {
    const router = useRouter()
    const [formStep, setFormStep] = useState(1)
    const now = new Date()
    const [formData, setFormData] = useState<RequestServiceFormData>({
        name: "",
        location: {
            street: "",
            city: "",
            state: "",
            zip: 90210,
            entryCode: null,
            unit: null
        },
        quantity: 1,
        pickupWindow: {
            start: now,
            end: now
        },
        returnWindow: {
            start: now,
            end: now
        },
        message: ""
    })
    const getPosition = (n: number): "left" | "center" | "right" => {
        if (formStep > n) {
            return "left"
        }
        if (formStep < n) {
            return "right"
        }
        return "center"
    }

    const handleSubmit = async () => {
        const res = await axios.post("/api/jobs/create", { data: formData }, defaultAxiosConfig)
        if (res.data?.success) {
            router.back()
            store.dispatch(showToast({
                isOpen: true,
                content: "Success! Someone will be by to pick up your laundry at the time you scheduled.",
                timeout: 10000,
                severity: "info",
                title: "Success!"
            }))
        }
    }

    const nextStep = () => {
        if (formStep < maxStep) {
            setFormStep(formStep + 1)
        }
        if (formStep === maxStep) {
            handleSubmit()
        }
    }
    const backStep = () => {
        if (formStep > 1) {
            setFormStep(formStep - 1)
        }
    }

    return (
        <div className={'min-w-fit bg-[--surface-card] border border-[--surface-border] rounded-xl w-[min(85vw,768px)]'}>
            <div className={'w-full px-6 py-4 text-center text-3xl bg-primary text-[--primary-color-text] rounded-tl-xl rounded-tr-xl'}>Request KleenBrake Service</div>
            <div className={'w-full h-full relative overflow-hidden'}>
                <RequestFormOne formData={formData} setFormData={setFormData} position={getPosition(1)} />
                <RequestServiceFormTwo formData={formData} window="pickup" setFormData={setFormData} position={getPosition(2)} />
                <RequestServiceFormTwo formData={formData} window="return" setFormData={setFormData} position={getPosition(3)} />
                <RequestServiceFormMessage formData={formData} setFormData={setFormData} position={getPosition(4)} />
            </div>
            <div className={'w-full flex flex-row justify-end items-center px-6 pb-6 gap-4'}>
                {formStep > 1 && (
                    <Button label="Back" onClick={backStep} severity='warning' />
                )
                }
                <Button label={formStep === maxStep ? "Submit" : "Continue"} severity={formStep === maxStep ? "success" : undefined} onClick={nextStep} />
            </div>
        </div>
    )
}


RequestServiceForm.displayName = "RequestServiceForm"


export default RequestServiceForm;
