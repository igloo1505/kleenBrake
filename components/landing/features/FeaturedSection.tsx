import React from 'react'
import { AppDataType, groupFeatureLabels } from '../../../state/initial/appData';
import { FeatureLabelType, FeaturedLabelCategory } from '../../../types/UITypes';
import FeaturesCategory from './FeaturesCategory';



interface FeaturesSectionProps {
    appData: AppDataType
}

const FeaturesSection = ({ appData }: FeaturesSectionProps) => {
    const grouped = groupFeatureLabels(appData.featureLabels)
    return (
        <div className={'w-full my-6 sm:mt-8 sm:mb-16 flex flex-col justify-center items-center gap-4 sm:gap-1 sm:grid sm:grid-cols-3 sm:place-items-center sm:grid-rows-1'}>
            {Object.keys(grouped).map((group, i) => {
                return appData.featureLabels ? <FeaturesCategory key={`feature-${i}`} category={group as FeaturedLabelCategory} features={grouped[group as FeaturedLabelCategory] as FeatureLabelType[]} /> : <div></div>
            })}
        </div>
    )
}



export default FeaturesSection;
