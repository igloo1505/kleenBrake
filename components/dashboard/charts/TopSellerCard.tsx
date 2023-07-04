import { topSeller } from '#/types/chartData'
import { formatCurrencyString } from '#/utils/formatting'
import React from 'react'
import DashboardDetailBadge from '../DashboardListItemDetailBadge'


interface TopSellerCardProps {
    seller: topSeller
}






const TopSellerCard = ({ seller }: TopSellerCardProps) => {
    return (
        <div className={'w-full h-full grid grid-cols-[1fr_2fr] grid-rows-1 bg-[--surface-section] text-[--text-color] rounded-lg px-4 py-4 gap-4 border border-[--surface-border]'}>
            <div className={'flex justify-center items-center'}>
                <div>{seller.username}</div>
            </div>
            <div className={'w-full grid grid-cols-2 gap-4 py-0'}>
                <DashboardDetailBadge val={`${seller.salesQuantity}`} numerical={seller.salesQuantity} label="Sales" color="success" />
                <DashboardDetailBadge val={formatCurrencyString(seller.salesTotal)} numerical={seller.salesTotal} label="Revenue" color="success" />
            </div>
        </div>
    )
}


TopSellerCard.displayName = "TopSellerCard"


export default TopSellerCard;
