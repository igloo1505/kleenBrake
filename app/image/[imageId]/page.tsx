import React from 'react'
import Image from 'next/image'


interface ImagePagePrimaryProps {
    params: {
        imageId: string
    }
}

const ImagePagePrimary = (props: ImagePagePrimaryProps) => {
    return (
        <div>
            {props?.params?.imageId && (
                <Image src={`/api/images/${props?.params?.imageId}`} alt="User Image" width={1080} height={1080} />
            )
            }

        </div>
    )
}


ImagePagePrimary.displayName = "ImagePagePrimary"


export default ImagePagePrimary;
