import DashboardGraphGrid from '@/dashboard/DashboardGraphGrid';
import SalesByDepth from '@/dashboard/SalesByDepth';
import SalesHistory from '@/dashboard/SalesHistory';
import React from 'react'
import RecentSales from '@/dashboard/RecentSales';
import TopSellers from '@/dashboard/TopSellers';
import { getChildrenData, validateOrRedirect } from '#/utils/serverUtils';
import { redirect } from 'next/navigation';
import { parseChartData } from '#/types/chartData';
import { UserIncludeAll, UserWithAll } from '#/state/types/AuthTypes';


interface DashboardProps {
    params: {
        userId: number
    }
}



const Dashboard = async ({ }: DashboardProps) => {
    const valid = await validateOrRedirect(undefined, UserIncludeAll)
    if (!valid.user) {
        return redirect(valid.redirectPath || "/")
    }
    const user = valid.user as UserWithAll
    const data = await getChildrenData(user)
    if (!data) return redirect(valid.redirectPath || "/")
    const parsedData = parseChartData(user, data)
    return (
        <div className={'w-full'}>
            <DashboardGraphGrid data={parsedData} />
            <div className={'w-full px-6 mt-6 grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-4'}>
                <SalesHistory salesHistory={parsedData.salesHistory} />
                <SalesByDepth data={parsedData.salesByDepth} />
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
