import React from 'react'
import { AppDataType } from '../../../state/initial/appData'
import { Card } from 'primereact/card'
import store from '../../../state/store'
import { AppStatItemType } from '../../../types/UITypes'
import { setChangeModalActive } from '../../../state/slices/testing'


interface ChangeCardItemProps {
    item: AppStatItemType
    idx: number
}

const ChangeCardItem = ({ idx, item }: ChangeCardItemProps) => {
    const launchModal = (isTitle: boolean) => {
        if (isTitle) {
            store.dispatch(setChangeModalActive({
                label: "Title",
                value: item.label,
                name: "item",
                parentName: "appStats",
                isOpen: true,
                itemIndex: idx,
                subKey: "label",
                isAppStat: true
            }))
        }
        if (!isTitle) {
            store.dispatch(setChangeModalActive({
                label: "Value",
                value: String(item.value),
                name: "item",
                parentName: "appStats",
                isOpen: true,
                itemIndex: idx,
                subKey: "value",
                isAppStat: true
            }))
        }
    }


    return (
        <Card className={'w-fit cursor-pointer'}>
            <div className={'text-lg text-[--primary-color]'} onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                launchModal(true)
            }}>{item.label}</div>
            <div className={'text-lg w-fit rounded'} onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                launchModal(false)
            }}>
                {item.value}
            </div>
        </Card>
    )
}



export default ChangeCardItem;
