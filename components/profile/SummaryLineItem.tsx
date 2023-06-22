"use client"
import clsx from 'clsx'
import React, { MouseEventHandler } from 'react'


interface ProfileLineItemProps {
    label: string
    value: string
    onClick?: MouseEventHandler
}

const ProfileLineItem = ({ label, value, onClick }: ProfileLineItemProps) => {
    return (
        <div className={'w-full'}>
            <div className={'text-lg mt-4'}>{`${label}:`}</div>
            <div className={clsx('h-full pl-8', onClick && "cursor-pointer")} onClick={onClick ? onClick : () => { }}>{value}</div>
        </div>
    )
}


ProfileLineItem.displayName = "SummaryLineItem"


export default ProfileLineItem;
