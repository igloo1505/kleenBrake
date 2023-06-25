"use client"
import Image, { ImageLoader, ImageLoaderProps } from 'next/image'
import MediaModalWrapper from '../modals/MediaModalWrapper';


interface ImageModalProps {
    url: string
    loader?: ImageLoader
    overRideLoader?: boolean
}

const ImageModal = ({ url, loader, overRideLoader }: ImageModalProps) => {
    const _loader = ({ src }: ImageLoaderProps) => `${src}`
    const params = {
        ...(loader && { loader }),
        ...(overRideLoader && { loader: _loader })
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
