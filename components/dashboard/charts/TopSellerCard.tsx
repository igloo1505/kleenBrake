import { topSeller } from '#/types/chartData'
import { formatCurrencyString } from '#/utils/formatting'
import clsx from 'clsx'
import React from 'react'


interface TopSellerCardProps {
    seller: topSeller
}

interface TSDetailProps {
    label: string
    val: string
    color: "success" | "error" | "primary" | "info"
}

const TopSellerDetail = ({ label, val, color }: TSDetailProps) => {
    return (
        <div className={clsx('px-4 py-2 h-full w-full rounded-xl flex flex-col justify-center items-center', color === "success" && "p-button p-button-success")}
            style={{
                cursor: "default !important"
            }}
        >
            <div>{label}</div>
            <div>{val}</div>
        </div>
    )

}

const TopSellerCard = ({ seller }: TopSellerCardProps) => {
    return (
        <div className={'w-full h-full grid grid-cols-[1fr_2fr] grid-rows-1 bg-[--surface-section] rounded-lg px-4 py-4 gap-4'}>
            <div className={'flex justify-center items-center'}>
                <div>{seller.username}</div>
            </div>
            <div className={'w-full grid grid-cols-2 gap-4'}>
                <TopSellerDetail val={`${seller.salesQuantity}`} label="Sales" color="success" />
                <TopSellerDetail val={formatCurrencyString(seller.salesTotal)} label="Revenue" color="success" />
            </div>
        </div>
    )
}


TopSellerCard.displayName = "TopSellerCard"


export default TopSellerCard;
