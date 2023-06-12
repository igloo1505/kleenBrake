"use client"
import React from 'react'
import { FeatureLabelType, FeaturedLabelCategory } from '../../../types/UITypes';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown'
import { FaWindowClose } from 'react-icons/fa'
import store from '../../../state/store';
import { setChangeModalActive } from '../../../state/slices/testing';
const categories = [
    "Seller",
    "Buyer",
    "Content"
]

interface FeaturedItemManipulationProps {
    item: FeatureLabelType
    idx: number
    handleChange: (data: FeatureLabelType, idx: number, category: FeaturedLabelCategory) => void
    category: FeaturedLabelCategory
    removeItem: (cat: FeaturedLabelCategory, idx: number) => void
}

const FeaturedItemManipulation = ({ item, handleChange, idx, category, removeItem }: FeaturedItemManipulationProps) => {
    const setCategory = (value: FeaturedLabelCategory) => {
        handleChange({
            ...item,
            category: value
        }, idx, category)
    }

    const setValue = () => {
        store.dispatch(setChangeModalActive({
            label: "Change Value",
            value: item.label,
            isOpen: true,
            itemIndex: idx,
            name: "featureLabels",
            subKey: "value",
            isChangeFeatureLabel: category
        }))
    }
    return (
        <Card header={<div
            className={'w-full flex flex-row justify-end items-start pt-2 pr-2'}><i className={'cursor-pointer text-[--primary-color] pi pi-times'} onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                removeItem(category, idx)
            }} /></div>}>
            <div className={'text-lg my-3 cursor-pointer'} onClick={setValue}>
                {item.label}
            </div>
            <div>
                <div>Category</div>
                <Dropdown value={item.category} onChange={(e) => setCategory(e.value.toLowerCase())} options={categories}
                    placeholder="Category" className="w-fit md:w-14rem" />
            </div>
        </Card>
    )
}



export default FeaturedItemManipulation;
