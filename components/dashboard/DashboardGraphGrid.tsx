import React from 'react'
import DashboardGraphCard from './DashboardGraphCard';
import { ParsedChartData } from '#/types/chartData';



interface DashboardGraphGridProps {
    data: ParsedChartData
}

const DashboardGraphGrid = ({ data }: DashboardGraphGridProps) => {
    const salesHist = data.salesHistory.map((s) => s.totalQuantity)
    const revenueHist = data.salesHistory.map((s) => s.totalSales)
    const currentSales = salesHist.length > 0 ? salesHist.reduce((a, b) => a + b) : 0
    const currentRev = revenueHist.length > 0 ? revenueHist.reduce((a, b) => a + b) : 0
    return (
        <div className={'w-full grid grid-cols-1 lg:grid-cols-3 gap-4 px-6'}>
            <DashboardGraphCard currentData={currentSales} previousData={data.previousWeek.salesQuantity} label="Sales" />
            <DashboardGraphCard type="money" currentData={currentRev} previousData={data.previousWeek.salesTotal} label="Revenue" />
            <DashboardGraphCard currentData={data.totalDescendants} previousData={data.previousWeek.descendants} label="Descendants" />
        </div>
    )
}


DashboardGraphGrid.displayName = "DashboardGraphGrid"


export default DashboardGraphGrid;
