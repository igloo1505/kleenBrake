import React from 'react'
import SalesHistoryChart from './charts/salesHistoryChart';
import { ParsedChartData } from '#/types/chartData';
import DashboardCardWithTitle from './DashboardCardWithTitle';


interface SalesHistoryProps {
    salesHistory: ParsedChartData['salesHistory']
}

const SalesHistory = ({ salesHistory: history }: SalesHistoryProps) => {
    return (
        <DashboardCardWithTitle
            title="Sales History"
            style={{
                minHeight: "max(40vh, 400px)",
            }}
        >
            <div className={'w-full h-full flex justify-center items-center overflow-hidden'}>
                <SalesHistoryChart />
            </div>
        </DashboardCardWithTitle>
    )
}


SalesHistory.displayName = "SalesHistory"


export default SalesHistory;
