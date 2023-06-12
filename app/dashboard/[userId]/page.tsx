import type { NextPage } from 'next';
import React from 'react'



interface DashboardProps {
    params: {
        userId: number 
    }
}


const Dashboard = ({params: {
userId
}}: DashboardProps) => {
return (
    <div>{`Dashboard: ${userId}`}</div>
)
}


Dashboard.displayName = "Dashboard"


export default Dashboard;
