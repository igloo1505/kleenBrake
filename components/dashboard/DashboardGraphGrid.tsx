import React from 'react'
import DashboardGraphCard from './DashboardGraphCard';
import { ParsedChartData } from '#/types/chartData';



interface DashboardGraphGridProps {
    data: ParsedChartData
}

const DashboardGraphGrid = ({ data }: DashboardGraphGridProps) => {
    return (
        <div className={'w-full grid grid-cols-1 lg:grid-cols-3 gap-4 px-6'}>
            <DashboardGraphCard currentData={data.totals.quantity} previousData={data.previousWeek.salesQuantity} label="Sales" />
            <DashboardGraphCard type="money" currentData={data.totals.revenue} previousData={data.previousWeek.salesTotal} label="Revenue" />
            <DashboardGraphCard currentData={data.totalDescendants} previousData={data.previousWeek.descendants} label="Descendants" />
        </div>
    )
}


DashboardGraphGrid.displayName = "DashboardGraphGrid"


export default DashboardGraphGrid;
