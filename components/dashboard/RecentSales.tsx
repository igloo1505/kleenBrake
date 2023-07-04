import { ParsedChartData } from '#/types/chartData';
import React from 'react'
import DashboardCardWithTitle from './DashboardCardWithTitle';
import RecentSaleListItem from './RecentSaleListItem';
import DashboardGridList from './DashboardGridList';



interface RecentSalesProps {
    recentSales: ParsedChartData['recentSales']
}

const SalesHistory = ({ recentSales }: RecentSalesProps) => {
    return (
        <DashboardCardWithTitle
            style={{
                minHeight: "min(30vh, 300px)"
            }}
            title="Recent Sales"
        >
            <DashboardGridList listLength={3}>
                {recentSales.length > 0 ? recentSales.map((s, i) => {
                    return (
                        <RecentSaleListItem item={s} key={`recent-sale-${i}`} />
                    )
                }) : <div className={'text-[--text-color]'}>No sales yet</div>}
            </DashboardGridList>
        </DashboardCardWithTitle>
    )
}


SalesHistory.displayName = "SalesHistory"


export default SalesHistory;
