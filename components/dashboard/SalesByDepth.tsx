import { Dashboard, User } from '@prisma/client';
import React from 'react'
import SalesByDepthChart from './charts/byDepth';



interface SalesByDepthProps {
    data: (User & {
        dashboard: Dashboard | null;
    }) | null
}

const SalesByDepth = (props: SalesByDepthProps) => {
    return (
        <div className={'dashboardCard w-full h-full grid grid-cols-1 grid-rows-[2rem_1fr] relative overflow-hidden'}
            style={{
                minHeight: "max(20vh, 200px)"
            }}>
            <div className={'dashboardCard-title'}>Sales By Depth</div>
            <div className={'w-full max-w-full h-full flex justify-center items-center text-center'}>
                <SalesByDepthChart />
            </div>
        </div>
    )
}


SalesByDepth.displayName = "SalesByDepth"


export default SalesByDepth;
