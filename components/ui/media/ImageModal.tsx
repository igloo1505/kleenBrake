"use client"
import Image, { ImageLoader } from 'next/image'
import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import MediaModalWrapper from '../modals/MediaModalWrapper';


interface ImageModalProps {
    url: string
    loader?: ImageLoader
}

const ImageModal = ({ url, loader }: ImageModalProps) => {
    console.log("targetUrl: ", url)
    const params = {
        ...(loader && { loader })
    }
    return (
        <MediaModalWrapper>
            <div className={''}>
                <Image src={url} width={1080} height={1080} alt="User Image" id="image-modal" priority={true} {...params} />
            </div>
        </MediaModalWrapper>
    )
}


ImageModal.displayName = "ImageModal"


export default ImageModal;
