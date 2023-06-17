"use client"
import DashboardComponentToggle from '@/dashboard/DashboardComponentToggle'
import ReduxProvider from '../strucutre/redux-provider'

const WrappedFooter = () => {
    return (
        <ReduxProvider>
            <DashboardComponentToggle />
        </ReduxProvider>
    )
}

export default WrappedFooter
