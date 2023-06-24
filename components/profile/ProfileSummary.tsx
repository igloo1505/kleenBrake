"use client"
import { Dashboard, User } from '@prisma/client'
import React from 'react'
import Button from '@/io/Button'
import Link from 'next/link'
import EditProfileContent from './editProfileContent'
import { EditProfileFormData } from './editProfileCard'
import { days, months } from '#/utils/dateStuff'
import { showToast } from '#/state/slices/ui'
import store from '#/state/store'
import { getSubscriptionResponse } from '#/utils/serverUtils'



interface ProfileSummaryProps {
    user: (User & { dashboard: Dashboard })
    subscription: getSubscriptionResponse | undefined
}


const ProfileSummary = ({ user, subscription }: ProfileSummaryProps) => {
    const host = window.location.host
    const refUrl = `${host}/referer/${user.id}`
    const formData: EditProfileFormData = {
        email: user.email,
        payment: {
            nameOnAccount: user.nameOnAccount || "",
            cardNumber: "xxx-xxx-xxxx",
            securityNumber: "111",
            expiration: {
                month: months[0].label,
                day: days[0].label
            },
            agreeToTerms: false,
            subscribed: subscription?.active || false
        }
    }

    const copyContent = () => {
        navigator.clipboard.writeText(refUrl);
        store.dispatch(showToast({
            severity: "success",
            title: "Copied!",
            content: "Your referal URL was copied to your clipboard.",
            timeout: 5000,
            isOpen: true
        }))
    }

    return (
        <div className={'w-full px-6 py-6 mt-8 rounded-xl h-full transition-transform duration-500 flex flex-col gap-2 max-w-[80vw] md:max-w-[600px] bg-[--surface-card]'} style={{
            border: "1px solid var(--surface-border)"
        }}>
            <div className={'w-full flex flex-col justify-center items-center gap-1'}>
                <div className={'text-lg'}>Referal Link</div>
                <div onClick={copyContent} className={'bg-primary text-[--primary-color-text] px-4 py-2 rounded-lg cursor-pointer'}>{refUrl}</div>
            </div>
            <EditProfileContent
                formData={formData}
                handlePaymentInfoString={() => { }}
                setFormData={() => { }}
                handlePaymentInfoChange={() => { }}
                handleMaskedComplete={() => { }}
                disabled={true}
            />
            <div className={'w-full flex flex-row justify-end items-center gap-4 mt-4'}>
                <Button label={formData.payment.subscribed ? "Subscribed" : "Not Subscribed"} severity={formData.payment.subscribed ? "success" : "danger"} className={'ml-4'} />
                <Link href="/editProfile">
                    <Button label="Edit" />
                </Link>
            </div>
        </div>
    )
}


ProfileSummary.displayName = "ProfileSummary"


export default ProfileSummary;
