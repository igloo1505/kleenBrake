"use client"
import { ParsedChartData, topSeller } from '#/types/chartData'
import React, { useState } from 'react'
import TopSellerCard from './charts/TopSellerCard'
import { FaChartLine, FaDollarSign, FaMinusCircle, FaPlusCircle } from 'react-icons/fa'

type ButtonKey = keyof ParsedChartData['topSellers'] | "increment" | "decremement"

interface TopSellersListProps {
    data: ParsedChartData['topSellers']
}

const IconButton = ({ icon, onClick, active }: { icon: ButtonKey, onClick: (k: ButtonKey) => void, active: boolean }) => {

    return (
        <div onClick={() => onClick(icon)}
            className={'flex justify-center items-center w-full h-full rounded-lg transition-all duration-150 min-h-[32px]'}
            style={{
                cursor: active ? "pointer" : "default",
                border: "2px solid var(--primary-color)",
                ...(active && { backgroundColor: "var(--primary-color)" }),
                color: active ? "var(--primary-color-text)" : "var(--text-color)"
            }}
        >
            {icon === "byValue" && <FaDollarSign />}
            {icon === "byQuantity" && <FaChartLine />}
            {icon === "decremement" && <FaMinusCircle />}
            {icon === "increment" && <FaPlusCircle />}
        </div>
    )
}


const TopSellersList = ({ data }: TopSellersListProps) => {
    const listLength = 3
    const [activeList, setActiveList] = useState<keyof ParsedChartData['topSellers']>("byQuantity")
    const [slicedIdx, setSlicedIdx] = useState<[number, number]>([0, listLength])
    const handleSlice = (n: number) => {
        const newSlice = [slicedIdx[0] + n, slicedIdx[1] + n] as [number, number]
        if (newSlice[1] < data[activeList].length - 1 && newSlice[0] >= 0) {
            setSlicedIdx(newSlice)
        }
    }
    return (
        <div className={'w-full grid grid-cols-[40px_1fr] grid-rows-1 gap-4'}>
            <div className={'gap-2 grid grid-cols-1 grid-rows-4 h-full w-full place-items-center'}>
                <IconButton icon="decremement" onClick={(k: ButtonKey) => handleSlice(-1)} active={slicedIdx[0] > 0} />
                <IconButton icon="byValue" onClick={setActiveList as (k: ButtonKey) => void} active={activeList !== "byValue"} />
                <IconButton icon="byQuantity" onClick={setActiveList as (k: ButtonKey) => void} active={activeList !== "byQuantity"} />
                <IconButton icon="increment" onClick={(k: ButtonKey) => handleSlice(1)} active={slicedIdx[1] < data[activeList].length - 1} />
            </div>
            <div className={'w-full h-full grid gap-2'}
                style={{
                    gridTemplateRows: `repeat(${listLength}, 1fr)`
                }}
            >
                {data[activeList].slice(slicedIdx[0], slicedIdx[1]).map((s, i) => {
                    return <TopSellerCard seller={s} key={`top-seller-card-${i}`} />
                })}
            </div>
        </div>
    )
}


TopSellersList.displayName = "TopSellersList"


export default TopSellersList;
