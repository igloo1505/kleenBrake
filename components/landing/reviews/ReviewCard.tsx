import React from 'react'
import { ReviewType } from '../../../types/UITypes';
import ReviewCardImage from './ReviewCardImage';
import { Card } from 'primereact/card';
import Link from 'next/link'
import Button from '../../io/Button';
import { URL } from 'url';



interface ReviewCardProps {
    review: ReviewType
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    return (
        <Card>
            <div className={'flex flex-col justify-center items-center gap-2'}>
                <ReviewCardImage image={review.image} />
                <div>{review.body}</div>
                <div className={'w-full h-fit flex flex-row justify-start items-center mt-2'}>
                    <Button className={'shadow-lg hover:shadow-sm transition-shadow duration-300'}>
                        <Link href={`/users/${review.user}`} className={'w-fit h-fit'}>
                            {review.user}
                        </Link>
                    </Button>
                </div>
            </div>
        </Card>
    )
}



export default ReviewCard;
