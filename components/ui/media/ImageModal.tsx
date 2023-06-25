"use client"
import Image from 'next/image'
import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import MediaModalWrapper from '../modals/MediaModalWrapper';


interface ImageModalProps {
    url: string
}

const ImageModal = ({ url }: ImageModalProps) => {
    console.log("targetUrl: ", url)
    return (
        <MediaModalWrapper>
            <div className={''}>
                <Image src={url} width={1080} height={1080} alt="User Image" id="image-modal" priority={true} style={{
                }} />
            </div>
        </MediaModalWrapper>
    )
}


ImageModal.displayName = "ImageModal"


export default ImageModal;
