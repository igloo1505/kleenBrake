import { topSeller } from '#/types/chartData'
import React from 'react'



interface TopSellerCardProps {
    seller: topSeller
}

const TopSellerCard = ({ seller }: TopSellerCardProps) => {
    return (
        <div className={'w-full h-full grid grid-cols-[1fr_2fr] grid-rows-1 md:grid-cols-1 md:grid-rows-2 bg-[--surface-section] rounded-lg px-4 py-4'}>
            <div>{seller.username}</div>
        </div>
    )
}


TopSellerCard.displayName = "TopSellerCard"


export default TopSellerCard;
