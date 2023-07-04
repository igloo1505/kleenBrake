import React from 'react'



interface DashboardGridListProps {
    children: React.ReactNode
    listLength: number
}

const DashboardGridList = ({ children, listLength }: DashboardGridListProps) => {
    return (
        <div className={'w-full h-full grid gap-2'}
            style={{
                gridTemplateRows: `repeat(${listLength}, 1fr)`
            }}
        >
            {children}
        </div>
    )
}


DashboardGridList.displayName = "DashboardGridList"


export default DashboardGridList;
