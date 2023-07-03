import { GraphHandlerReturnType, descendantsGraphHandler, revenueGraphHandler, salesGraphHandler } from '#/utils/graphUtils'
import { Dashboard, User } from '@prisma/client'
import React from 'react'
import { FaDollarSign } from 'react-icons/fa'
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs'
import { percentChange } from '#/utils/formatting'
import DashboardCardWithTitle from './DashboardCardWithTitle'

export type DashboardGraphCardTypes = "money"


const DashboardGraphCardDataHandler: { [k in DashboardGraphCardTypes]: (s: any) => GraphHandlerReturnType } = {
    money: salesGraphHandler,
}


interface DashboardGraphCardProps {
    type?: DashboardGraphCardTypes
    currentData: number
    previousData: number
    label: string
}

const PercentChangeDisplay = ({ percentChange, status }: { percentChange: "N/A" | number, status: GraphHandlerReturnType['status'] }) => {
    let val = percentChange === "N/A" ? "--" : status === "green" ? "+" : ""
    if (percentChange !== "N/A") {
        val += `${parseInt(String(percentChange))}%`
    }
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
            <div className={' justify-start items-center'}>{`${val}`}</div>
            {status === "green" && <BsArrowUpRight />}
            {status === "red" && <BsArrowDownRight />}
        </div>
    )
}

const DashboardGraphCard = ({ type, currentData, previousData, label }: DashboardGraphCardProps) => {
    const status = currentData > previousData ? "green" : currentData < previousData ? "red" : "neutral"
    const pChange = percentChange(previousData, currentData)
    return (
        <DashboardCardWithTitle title={label} padding={false}
        >
            <div className={'w-full flex flex-col justify-center items-center px-4 pb-4'}>
                <div className={'flex flex-row justify-start items-center gap-0 flex-nowrap w-full mt-2'} style={{
                    ...(type === "money" && { transform: "translateX(-0.5rem)" })
                }}>
                    {type === "money" && <FaDollarSign className={'h-[1.875rem] w-fit max-w-[30px]'} />}
                    <div className={'text-3xl font-bold h-full flex justify-center items-center'}>
                        {currentData}
                    </div>
                </div>
                <PercentChangeDisplay status={status} percentChange={pChange} />
            </div>
        </DashboardCardWithTitle>
    )
}


DashboardGraphCard.displayName = "DashboardGraphCard"


export default DashboardGraphCard;
