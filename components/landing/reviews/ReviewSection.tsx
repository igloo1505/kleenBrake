import React from 'react'
import { ReviewType } from '../../../types/UITypes';
import ReviewCard from './ReviewCard';
import { AppDataType } from '../../../state/initial/appData';



interface ReviewSectionProps {
    reviews: ReviewType[]
    reviewUI: AppDataType['landing']['reviewUI']
}

const ReviewSection = ({ reviews, reviewUI }: ReviewSectionProps) => {
    return (
        <div className={'flex flex-col justify-center items-center gap-2 my-6'}>
            <div className={'text-3xl font-bold px-6 text-center'}>{reviewUI.title}</div>
            <div className={'sm:text-lg px-6 text-center'}>{reviewUI.body}</div>
            <div className={'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 px-6 gap-3'}>
                {reviews.map((r, i) => {
                    return <ReviewCard review={r} key={`review-card-${i}`} />
                })}
            </div>
        </div>
    )
}



export default ReviewSection;
