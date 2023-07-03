import React from 'react'
import SalesHistoryChart from './charts/salesHistoryChart';
import { ParsedChartData } from '#/types/chartData';


interface SalesHistoryProps {
    salesHistory: ParsedChartData['salesHistory']
}

const SalesHistory = ({ salesHistory: history }: SalesHistoryProps) => {
    return (
        <div className={'dashboardCard w-full grid grid-rows-[2rem_1fr] max-h-[min(560px,80vh)]'} style={{
            minHeight: "max(40vh, 400px)",
        }}>
            <div className={'dashboardCard-title'}>Sales History</div>
            <div className={'w-full h-full flex justify-center items-center overflow-hidden'}>
                <SalesHistoryChart />
            </div>
        </div>
    )
}


SalesHistory.displayName = "SalesHistory"


export default SalesHistory;
