import { Dashboard, User } from '@prisma/client';
import React from 'react'



interface SalesByDepthProps {
    data: (User & {
        dashboard: Dashboard | null;
    }) | null
}

const SalesByDepth = (props: SalesByDepthProps) => {
    return (
        <div className={'dashboardCard w-full h-full flex flex-col justify-center items-center '}>
            <div>Will be a pie chart representing the proportions of sales by the depth of the person making the sale.</div>
        </div>
    )
}


SalesByDepth.displayName = "SalesByDepth"


export default SalesByDepth;
