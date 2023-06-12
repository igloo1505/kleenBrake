import React from 'react'
import { AppDataType } from '../../../state/initial/appData';
import AllFeaturesCard from './AllFeaturesCard';



interface AllFeaturesSectionProps {
    allFeatures: AppDataType['landing']['allFeatures']
}

const AllFeaturesSection = ({ allFeatures }: AllFeaturesSectionProps) => {
    return (
        <div className={'w-full max-w-screen flex flex-col justify-center items-center'}>
            <div className={'w-fit text-4xl'}>
                <div>All Features</div>
                <div className={'w-full scale-x-75 mt-1 h-[4px] bg-[--primary-color]'} />
            </div>
            <div className={'flex flex-row flex-wrap justify-center items-center gap-3 mt-4 px-2'} >
                {allFeatures.items.map((item, i) => {
                    return <AllFeaturesCard item={item} key={`all-features-card-${i}`} />
                })}
            </div>
        </div>
    )
}



export default AllFeaturesSection;
