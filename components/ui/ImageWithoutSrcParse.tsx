"use client"
import Image, { ImageLoaderProps } from 'next/image';
import React from 'react'



interface ImageWithoutSrcParsedProps {
    src: string
    alt: string
    width?: number
    height?: number
    fill?: boolean
    objectFit?: "cover" | "contain"
}


const ImageWithoutSrcParsed = (props: ImageWithoutSrcParsedProps) => {
    const loader = ({ src }: ImageLoaderProps) => `${src}`
    const params = {
        ...(props.width && { width: props.width }),
        ...(props.height && { height: props.height }),
        ...(props.fill && { fill: props.fill }),
    }
    return (
        <Image src={props.src} alt={props.alt} style={{
            objectFit: props.objectFit || "contain"
        }} loader={loader} {...params} />
    )
}


ImageWithoutSrcParsed.displayName = "ImageWithoutSrcParsed"


export default ImageWithoutSrcParsed;
