import { Dashboard, User } from '@prisma/client'
import React from 'react'
import ProfileLineItem from './SummaryLineItem'
import Button from '@/io/Button'
import Link from 'next/link'



interface ProfileSummaryProps {
    user: (User & { dashboard: Dashboard })
}


const ProfileSummary = ({ user }: ProfileSummaryProps) => {
    return (
        <div className={'flex flex-col justify-center items-center px-6 pt-2 pb-6 bg-[--surface-card] rounded-xl'} style={{
            border: "1px solid var(--surface-border)"
        }}>
            <ProfileLineItem label="User Name" value={user.username} />
            <ProfileLineItem label="Email" value={user.email} />
            <ProfileLineItem label="Subscription" value={user.dashboard?.subscription || "inactive"} />
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
