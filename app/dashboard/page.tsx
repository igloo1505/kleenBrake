import DashboardGraphGrid from '@/dashboard/DashboardGraphGrid';
import SalesByDepth from '@/dashboard/SalesByDepth';
import SalesHistory from '@/dashboard/SalesHistory';
import React from 'react'
import './styles.scss'
import RecentSales from '@/dashboard/RecentSales';
import TopSellers from '@/dashboard/TopSellers';
import { validateOrRedirect } from '#/utils/serverUtils';
import { redirect } from 'next/navigation';
import { parseChartData } from '#/types/chartData';


interface DashboardProps {
    params: {
        userId: number
    }
}


const Dashboard = async ({ }: DashboardProps) => {
    const valid = await validateOrRedirect()
    if (!valid.user) {
        return redirect(valid.redirectPath || "/")
    }
    const data = valid.user
    const parsedData = parseChartData(data)
    return (
        <div className={'w-full'}>
            <DashboardGraphGrid data={data} />
            <div className={'w-full px-6 mt-6 grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-4'}>
                <SalesHistory salesHistory={parsedData.salesHistory} />
                <SalesByDepth data={data} />
            </div>
            <div className={'w-full px-6 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4'}>
                <TopSellers topSellers={parsedData.topSellers} />
                <RecentSales recentSales={parsedData.recentSales} />
            </div>
        </div>
    )
}


Dashboard.displayName = "Dashboard"


export default Dashboard;
