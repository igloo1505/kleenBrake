import React from 'react'
import { HighlightedFeatureType } from '../../../types/UITypes';
import { IconType } from 'react-icons/lib';
import { Card } from 'primereact/card';



interface FeatureHighlightCardProps {
    item: HighlightedFeatureType
    Icon: IconType
}

const FeatureHighlightCard = ({ item, Icon }: FeatureHighlightCardProps) => {
    return (
        <Card className={'relative shadow-md hover:shadow-sm transition-shadow duration-300 card-hover-cheesy-effect'}>
            <div className={'flex h-full w-full flex-col justify-center items-center'}>
                <Icon className={'text-[--primary-color-text] bg-[--primary-color] p-3 m-1 w-[5rem] h-auto absolute left-[50%] top-0 transition-transform duration-500'} style={{
                    borderRadius: "50%",
                    transform: "translate(-50%, -2.5rem)"
                }} />
                <div className={'flex flex-col justify-center items-center text-2xl w-fit text-center text-bold mt-6'}>
                    <div>
                        {item.title}
                    </div>
                    <div className={'w-full h-[4px] bg-[--primary-color] mt-1 scale-x-50 chessy-effect-underline transition-transform duration-300'} />
                </div>
                <div className={'px-2 max-w-3/4 py-2 w-full text-center font-thin'}>{item.body}</div>
            </div>
        </Card>
    )
}



export default FeatureHighlightCard;
