import { prisma } from '#/db/db';
import DashboardGraphGrid from '@/dashboard/DashboardGraphGrid';
import SalesByDepth from '@/dashboard/SalesByDepth';
import SalesHistory from '@/dashboard/SalesHistory';
import React from 'react'
import './styles.scss'
import RecentSales from '@/dashboard/RecentSales';
import TopSellers from '@/dashboard/TopSellers';
import { checkAuthenticated } from '#/utils/authWithCookiesHook';
import { validateOrRedirect } from '#/utils/serverUtils';
import { redirect } from 'next/navigation';


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
    return (
        <div className={'w-full'}>
            <DashboardGraphGrid data={data} />
            <div className={'w-full px-6 mt-6 grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-4'}>
                <SalesHistory data={data} />
                <SalesByDepth data={data} />
            </div>
            <div className={'w-full px-6 mt-6 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4'}>
                <TopSellers data={data} />
                <RecentSales data={data} />
            </div>
        </div>
    )
}


Dashboard.displayName = "Dashboard"


export default Dashboard;
