import { Dashboard, User } from '@prisma/client';
import React from 'react'



interface TopSellersProps {
    data: (User & {
        dashboard: Dashboard | null;
    }) | null
}

const TopSellers = ({ data }: TopSellersProps) => {
    return (
        <div className={'dashboardCard grid grid-rows-[2rem_1fr]'}>
            <div className={'dashboardCard-title'}>Top Sellers</div>
            <div className={'w-full h-full flex justify-center items-center'}>
                Top Sellers List will go here...
            </div>
        </div>
    )
}


TopSellers.displayName = "TopSellers"


export default TopSellers;
