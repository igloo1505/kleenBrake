import { prisma } from '#/db/db';
import DashboardGraphGrid from '@/dashboard/DashboardGraphGrid';
import SalesByDepth from '@/dashboard/SalesByDepth';
import SalesHistory from '@/dashboard/SalesHistory';
import React from 'react'
import './styles.scss'
import RecentSales from '@/dashboard/RecentSales';
import TopSellers from '@/dashboard/TopSellers';


interface DashboardProps {
    params: {
        userId: number
    }
}


const Dashboard = async ({ params: {
    userId
} }: DashboardProps) => {
    const data = await prisma.user.findFirst({
        where: {
            id: Number(userId)
        },
        include: {
            dashboard: true
        }
    })
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
