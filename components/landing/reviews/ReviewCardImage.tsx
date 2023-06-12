import Image, { StaticImageData } from 'next/image';
import React from 'react'



interface ReviewCardImageProps {
    image: string | StaticImageData
}

const ReviewCardImage = ({ image }: ReviewCardImageProps) => {
    return (
        <div className={'w-full h-full max-h-[300px] overflow-hidden object-cover'}>
            <Image src={image} width={300} height={300} alt="User Image" className={'min-w-full w-full min-h-full rounded'} />
        </div>
    )
}



export default ReviewCardImage;
