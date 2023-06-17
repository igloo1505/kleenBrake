import { Dashboard, User } from '@prisma/client';
import React from 'react'



interface TopSellersProps {
    data: (User & {
        dashboard: Dashboard | null;
    }) | null
}

const TopSellers = ({ data }: TopSellersProps) => {
    return (
        <div className={'dashboardCard flex flex-col justify-center items-center'}>
            <div>
                Top Sellers List will go here...
            </div>
        </div>
    )
}


TopSellers.displayName = "TopSellers"


export default TopSellers;
