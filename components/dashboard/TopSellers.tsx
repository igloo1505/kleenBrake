import React from 'react'
import { ParsedChartData } from '#/types/chartData';
import TopSellersList from './TopSellersList';
import DashboardCardWithTitle from './DashboardCardWithTitle';



interface TopSellersProps {
    topSellers: ParsedChartData['topSellers']
}

const TopSellers = ({ topSellers }: TopSellersProps) => {
    console.log("topSellers: ", topSellers)
    return (
        <DashboardCardWithTitle
            style={{
                minHeight: "min(20vh, 200px)"
            }}
            title="Top Sellers"
        >
            <TopSellersList data={topSellers} />
        </DashboardCardWithTitle>
    )
}


TopSellers.displayName = "TopSellers"


export default TopSellers;
