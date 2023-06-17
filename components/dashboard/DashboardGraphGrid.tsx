import React from 'react'
import DashboardGraphCard from './DashboardGraphCard';
import { Dashboard, User } from '@prisma/client';



interface DashboardGraphGridProps {
    data: (User & {
        dashboard: Dashboard | null;
    }) | null
}

const DashboardGraphGrid = ({ data }: DashboardGraphGridProps) => {
    return (
        <div className={'w-full grid grid-cols-1 lg:grid-cols-3 gap-4 px-6'}>
            <DashboardGraphCard type="Sales" data={data} />
            <DashboardGraphCard type="Revenue" data={data} />
            <DashboardGraphCard type="Descendants" data={data} />
        </div>
    )
}


DashboardGraphGrid.displayName = "DashboardGraphGrid"


export default DashboardGraphGrid;
