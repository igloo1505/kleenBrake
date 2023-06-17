import { Dashboard, User } from '@prisma/client';
import React from 'react'



interface RecentSalesProps {
    data: (User & {
        dashboard: Dashboard | null;
    }) | null
}

const RecentSales = ({ data }: RecentSalesProps) => {
    return (
        <div className={'dashboardCard grid grid-rows-[2rem_1fr]'} style={{
            minHeight: "min(30vh, 300px)"
        }}>
            <div className={'dashboardCard-title'}>Recent Sales</div>
            <div className={'w-full h-full flex justify-center items-center'}>
                Recent Sales Table will go here
            </div>
        </div>
    )
}


RecentSales.displayName = "RecentSales"


export default RecentSales;
