"use client"
import React from 'react'
import { AppDataType } from '../../../state/initial/appData'
import { Card } from 'primereact/card'
import store from '../../../state/store'
import ChangeCardItem from './ChangeCardItem'
import { AppStatItemType } from '../../../types/UITypes'
import { setChangeModalActive } from '../../../state/slices/testing'



interface HeroContentManipulationProps {
    appData: AppDataType
}

interface ChangeItemProps {
    label: string
    name: string
    currentValue: string
    parentName: keyof AppDataType
}

const ChangeItem = ({ label, currentValue, name, parentName }: ChangeItemProps) => {
    const launchModal = () => {
        setChangeModalActive({
            label: label,
            value: currentValue,
            name: name,
            parentName: parentName,
            isOpen: true
        })
    }

    return (
        <Card title={label} className={'w-fit cursor-pointer'} onClick={launchModal}>
            <div className={'text-lg w-fit rounded'}>
                {currentValue}
            </div>
        </Card>
    )
}



const HeroContentManipulation = ({ appData }: HeroContentManipulationProps) => {
    const manipulationItems = [
        {
            label: "Hero Title",
            currentValue: appData.landing.heroMainTitle,
            name: "heroMainTitle",
            parentName: "landing"
        },
        {
            label: "Hero Sub-Title",
            currentValue: appData.landing.heroSubTitle,
            name: "heroSubTitle",
            parentName: "landing"
        },
        {
            label: "Hero Body",
            currentValue: appData.landing.heroCardBody,
            name: "heroCardBody",
            parentName: "landing"
        },
    ]

    return (
        <div className={'w-full h-auto flex flex-col justify-start items-start gap-4'}>
            {manipulationItems.map((item, i) => (
                <ChangeItem label={item.label} currentValue={item.currentValue} name={item.name} parentName={item.parentName as keyof AppDataType} key={`manip-item-${i}`} />
            ))}
            <div className={'w-full flex flex-col justify-center items-center'}>
                <div className={'text-2xl text-semibold my-4'}>Those little statistics cards</div>
                <div className={'flex flex-row justify-center items-center gap-4 flex-wrap'}>
                    {appData.appStats.items.map((item, i) => {
                        return (<ChangeCardItem idx={i} item={item} key={`change-card-item-${i}`} />)
                    })}
                </div>
            </div>
        </div>
    )
}



export default HeroContentManipulation;
