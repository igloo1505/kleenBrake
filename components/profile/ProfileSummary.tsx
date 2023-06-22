"use client"
import { Dashboard, User } from '@prisma/client'
import React from 'react'
import ProfileLineItem from './SummaryLineItem'
import Button from '@/io/Button'
import Link from 'next/link'
import EditProfileContent from './editProfileContent'
import { EditProfileFormData } from './editProfileCard'
import { days, months } from '#/utils/dateStuff'



interface ProfileSummaryProps {
    user: (User & { dashboard: Dashboard })
}


const ProfileSummary = ({ user }: ProfileSummaryProps) => {
    const formData: EditProfileFormData = {
        email: user.email,
        payment: {
            nameOnAccount: "",
            cardNumber: "xxx-xxx-xxxx",
            securityNumber: "111",
            expiration: {
                month: months[0].label,
                day: days[0].label
            },
            agreeToTerms: false
        }
    }
    return (
        <div className={'w-full px-6 py-6 mt-8 rounded-xl h-full transition-transform duration-500 flex flex-col gap-2 max-w-[80vw] md:max-w-[600px] bg-[--surface-card]'} style={{
            border: "1px solid var(--surface-border)"
        }}>
            <EditProfileContent
                formData={formData}
                handlePaymentInfoString={() => { }}
                setFormData={() => { }}
                handlePaymentInfoChange={() => { }}
                handleMaskedComplete={() => { }}
                disabled={true}
            />
            <div className={'w-full flex flex-row justify-end items-center'}>
                <Link href="/editProfile">
                    <Button label="Edit" />
                </Link>
            </div>
        </div>
    )
}


ProfileSummary.displayName = "ProfileSummary"


export default ProfileSummary;
