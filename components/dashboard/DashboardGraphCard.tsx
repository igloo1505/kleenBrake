import { GraphHandlerReturnType, descendantsGraphHandler, revenueGraphHandler, salesGraphHandler } from '#/utils/graphUtils'
import { Dashboard, User } from '@prisma/client'
import React from 'react'
import { FaDollarSign } from 'react-icons/fa'
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs'

export type DashboardGraphCardTypes = "Sales" | "Revenue" | "Descendants"


const DashboardGraphCardDataHandler: { [k in DashboardGraphCardTypes]: (s: any) => GraphHandlerReturnType } = {
    Sales: salesGraphHandler,
    Revenue: revenueGraphHandler,
    Descendants: descendantsGraphHandler
}


interface DashboardGraphCardProps {
    type: DashboardGraphCardTypes
    data: (User & {
        dashboard: Dashboard | null;
    }) | null
}

const PercentChangeDisplay = ({ percentChange, status }: { percentChange: GraphHandlerReturnType['percentChange'], status: GraphHandlerReturnType['status'] }) => {
    let val = status === "green" ? "+" : ""
    val += `${parseInt(String(percentChange))}`
    const colorMap: { [k in GraphHandlerReturnType['status']]: string } = {
        red: "--red-500",
        green: "--green-500",
        neutral: "--primary-color"
    }
    return (
        <div className={'w-full flex flex-row justify-start items-center gap-1'}
            style={{
                color: `var(${colorMap[status]})`
            }}>
            <div className={' justify-start items-center'}>{`${val}%`}</div>
            {status === "green" && <BsArrowUpRight />}
            {status === "red" && <BsArrowDownRight />}
        </div>
    )
}

const DashboardGraphCard = ({ type, data }: DashboardGraphCardProps) => {
    const parsedData = DashboardGraphCardDataHandler[type](data)
    return (
        <div className={'dashboardCard w-full grid grid-cols-[1fr_3fr] py-4'}>
            <div className={'w-full flex flex-col justify-center items-center'}>
                <div className={'text-xl font-bold opacity-[0.8] w-full'}>{type}</div>
                <div className={'flex flex-row justify-start items-center gap-0 flex-nowrap w-full mt-2'} style={{
                    ...(type === "Revenue" && { transform: "translateX(-0.5rem)" })
                }}>
                    {type === "Revenue" && <FaDollarSign className={'h-[1.875rem] w-fit'} />}
                    <div className={'text-3xl font-bold h-full flex justify-center items-center'}>
                        {parsedData.total}
                    </div>
                </div>
                <PercentChangeDisplay status={parsedData.status} percentChange={parsedData.percentChange} />
            </div>
        </div>
    )
}


DashboardGraphCard.displayName = "DashboardGraphCard"


export default DashboardGraphCard;
