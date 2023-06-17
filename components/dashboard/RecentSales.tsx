import { Dashboard, User } from '@prisma/client';
import React from 'react'



interface RecentSalesProps {
    data: (User & {
        dashboard: Dashboard | null;
    }) | null
}

const RecentSales = ({ data }: RecentSalesProps) => {
    return (
        <div className={'dashboardCard flex flex-col justify-center items-center'} style={{
            minHeight: "min(30vh, 300px)"
        }}>
            <div>
                Recent Sales Table will go here
            </div>
        </div>
    )
}


RecentSales.displayName = "RecentSales"


export default RecentSales;
