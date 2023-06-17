import { Dashboard, User } from '@prisma/client';
import React from 'react'
import { Chart } from 'primereact/chart'


interface SalesHistoryProps {
    data: (User & {
        dashboard: Dashboard | null;
    }) | null
}

const SalesHistory = ({ data }: SalesHistoryProps) => {
    return (
        <div className={'dashboardCard w-full flex justify-center items-center'} style={{
            minHeight: "min(40vh, 400px)",
        }}>
            <div>Sales History Chart will go here</div>
        </div>
    )
}


SalesHistory.displayName = "SalesHistory"


export default SalesHistory;
