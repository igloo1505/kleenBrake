import clsx from 'clsx'
import React from 'react'




interface TSDetailProps {
    label: string
    val: string
    numerical: number
    color: "success" | "error" | "primary" | "info"
}

const NoValue = () => {
    return (
        <div className={'w-full h-full text-3xl flex justify-center items-center text-center bg-red-500 text-white rounded-xl'}>--</div>
    )
}


const DashboardDetailBadge = ({ label, val, color, numerical }: TSDetailProps) => {
    return (
        <div className={clsx('h-full w-full rounded-xl grid grid-rows-[auto_1fr] gap-2')}
            style={{
                cursor: "default !important"
            }}
        >
            <div className={clsx('w-full text-center text-[--text-color]')}>{label}</div>
            {numerical === 0 ? <NoValue /> : <div className={clsx('p-4 w-full h-full flex justify-center items-center', color === "success" && "p-button p-button-success")}
                style={{
                    cursor: "default !important"
                }}
            >{val}</div>}
        </div>
    )

}


DashboardDetailBadge.displayName = "DashboardDetailBadge"


export default DashboardDetailBadge;
