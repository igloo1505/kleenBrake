import clsx from 'clsx'
import React from 'react'

type paddingType = "sm" | "lg" | "md" | "xl"
type PaddingMapType = { [key in paddingType]: string }

const paddingMap: PaddingMapType = {
    sm: "py-2",
    md: "py-4",
    lg: "py-6",
    xl: "py-8"
}

interface FullWidthBannerProps {
    children: React.ReactNode
    className?: string
    color?: "primary" | "highlight"
    size?: "md" | "lg" | "xl" | "xxl"
    padding?: paddingType
    fit?: boolean
}

const FullWidthBanner = ({ children, fit, className, color, size, padding }: FullWidthBannerProps) => {
    let bannerClasses = clsx('px-6 flex flex-col justify-center items-center break-all text-center',
        className && className,
        fit ? "w-fit" : "w-screen",
        color === "primary" && "bg-primary text-[--primary-color-text]",
        color === "highlight" && "bg-[--highlight-bg] text-[--highlight-text-color]",
        size === "md" && "text-lg",
        size === "lg" && "text-2xl",
        size === "xl" && "text-3xl",
        size === "xxl" && "text-4xl",
        typeof padding !== "undefined" && paddingMap[padding]
    )
    return (
        <div className={bannerClasses}>
            {children}
        </div>
    )
}


FullWidthBanner.displayName = "FullWidthBanner"


export default FullWidthBanner;
