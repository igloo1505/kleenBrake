"use client"
import Image from 'next/image'
import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import MediaModalWrapper from '../modals/MediaModalWrapper';


interface ImageModalProps {
    url: string
}

const ImageModal = ({ url }: ImageModalProps) => {
    console.log("Url in here!: ", url)
    const router = useRouter()

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onDismiss();
        },
        [onDismiss]
    );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);
    console.log("url: ", url)
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
