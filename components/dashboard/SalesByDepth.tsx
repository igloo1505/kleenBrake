import { Dashboard, User } from '@prisma/client';
import React from 'react'



interface SalesByDepthProps {
    data: (User & {
        dashboard: Dashboard | null;
    }) | null
}

const SalesByDepth = (props: SalesByDepthProps) => {
    return (
        <div className={'dashboardCard w-full h-full grid grid-rows-[2rem_1fr]'}
            style={{
                minHeight: "min(20vh, 200px)"
            }}>
            <div className={'dashboardCard-title'}>Sales By Depth</div>
            <div className={'w-full h-full flex justify-center items-center text-center'}>Will be a pie chart representing the proportions of sales by the depth of the person making the sale.</div>
        </div>
    )
}


SalesByDepth.displayName = "SalesByDepth"


export default SalesByDepth;
