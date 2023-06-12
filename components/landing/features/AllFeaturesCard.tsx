import React from 'react'
import { HighlightedFeatureType } from '../../../types/UITypes';
import { FaAsterisk } from 'react-icons/fa'


interface AllFeaturesCardProps {
    item: HighlightedFeatureType
}

const AllFeaturesCard = ({ item }: AllFeaturesCardProps) => {
    return (
        <div className={'grid mt-4 mx-2 sm:mx-1 sm:max-w-[300px]'} style={{
            gridTemplateColumns: "auto 1fr"
        }}>
            <div><FaAsterisk
                className={'mx-4 w-[2rem] h-auto text-[--primary-color]'}
            /></div>
            <div className={'flex flex-col justify-start items-start'}>
                <div className={'text-xl'}>{item.title}</div>
                <div className={'mt-4'}>{item.body}</div>
            </div>
        </div>
    )
}



export default AllFeaturesCard;
