import { Dashboard, User } from '@prisma/client';
import React from 'react'
import TopSellerCard from './charts/TopSellerCard';
import { topSeller } from '#/types/chartData';



interface TopSellersProps {
    topSellers: topSeller[]
}

const TopSellers = ({ topSellers = [] }: TopSellersProps) => {
    return (
        <div className={'dashboardCard grid grid-rows-[2rem_1fr]'}
            style={{
                minHeight: "min(20vh, 200px)"
            }}>
            <div className={'dashboardCard-title'}>Top Sellers</div>
            <div className={'w-full h-full flex justify-center items-center'}>
                {topSellers.map((s, i) => {
                    return <TopSellerCard seller={s} key={`top-seller-card-${i}`} />
                })}
            </div>
        </div>
    )
}


TopSellers.displayName = "TopSellers"


export default TopSellers;
