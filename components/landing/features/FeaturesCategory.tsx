import React from 'react'
import { FeatureLabelType, FeaturedLabelCategory } from '../../../types/UITypes';



interface FeaturesCategoryProps {
    category: FeaturedLabelCategory
    features: FeatureLabelType[]
}


const FeatureDisplayItem = ({ item }: { item: FeatureLabelType }) => {
    return (
        <div className={'w-full lg:text-lg flex flex-row justify-start items-center gap-2 feature-item-hover-parent'}>
            <i className={'pi pi-check text-[--primary-color] font-extrabold'}></i>
            <div className={'w-full'}>{item.label}</div>
        </div>
    )
}

const headingMap = {
    seller: "Features for Sellers",
    buyer: "Features for buyers",
    content: "Content Features"
}

const FeaturesCategory = ({ category, features }: FeaturesCategoryProps) => {
    return (
        <div className={'h-full w-full mt-4 sm:mt-0 flex flex-col justify-start items-center'}>
            <div className={'mb-2'}>
                <div className={'text-4xl sm:text-2xl lg:text-3xl xl:text-4xl'}>{headingMap[category]}</div>
                <div className={'w-full h-[4px] bg-[--primary-color] pt-1 scale-75'} />
            </div>
            <div className={'grid grid-cols-1 max-w-full gap-1'}>
                {
                    features.map((f, i) => {
                        return <FeatureDisplayItem item={f} key={`feature-item-${f.category}-${i}`} />
                    })
                }
            </div>
        </div>
    )
}



export default FeaturesCategory;
