"use client"
import { ParsedChartData, topSeller } from '#/types/chartData'
import React, { useState } from 'react'
import TopSellerCard from './charts/TopSellerCard'
import { FaChartLine, FaDollarSign } from 'react-icons/fa'


interface TopSellersListProps {
    data: ParsedChartData['topSellers']
}

const IconButton = ({ icon, setList, activeList }: { icon: keyof ParsedChartData['topSellers'], setList: (k: keyof ParsedChartData['topSellers']) => void, activeList: keyof ParsedChartData['topSellers'] }) => {
    return (
        <div onClick={() => setList(icon)}
            className={'flex justify-center items-center w-full h-full rounded-lg transition-all duration-150 cursor-pointer'}
            style={{
                border: "2px solid var(--primary-color)",
                ...(icon === activeList && { backgroundColor: "var(--primary-color)" }),
                color: icon === activeList ? "var(--primary-color-text)" : "var(--text-color)"
            }}
        >
            {icon === "byValue" ? <FaDollarSign /> : <FaChartLine />}
        </div>
    )
}

const TopSellersList = ({ data }: TopSellersListProps) => {
    const [activeList, setActiveList] = useState<keyof ParsedChartData['topSellers']>("byQuantity")
    const [slicedIdx, setSlicedIdx] = useState<[number, number]>([0, 3])
    return (
        <div className={'w-full grid grid-cols-[40px_1fr] grid-rows-1 gap-4'}>
            <div className={'gap-2 grid grid-cols-1 grid-rows-2 h-full w-full place-items-center'}>
                <IconButton icon="byValue" setList={setActiveList} activeList={activeList} />
                <IconButton icon="byQuantity" setList={setActiveList} activeList={activeList} />
            </div>
            <div className={'w-full h-full grid gap-2'}
                style={{
                    gridTemplateRows: `repeat(1fr, ${slicedIdx[1] - slicedIdx[0]})`
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
