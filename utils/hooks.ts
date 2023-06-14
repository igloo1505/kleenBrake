import { useEffect, useState } from "react"

interface ScrollFactor {
    allowed: boolean
    scrollablePixels: number
    scrollPortion: number
}

export const useScrollFactor = (): ScrollFactor | null => {
    if (typeof window === "undefined") return null;
    const [scrollPortion, setScrollPortion] = useState<ScrollFactor>({
        allowed: false,
        scrollablePixels: -1,
        scrollPortion: -1
    })
    const handleScrollFactor = () => {
        let h = window.innerHeight
        let th = document.body.clientHeight
        let scroll = window.scrollY
        const result: ScrollFactor = {
            allowed: th > h,
            scrollablePixels: th - h,
            scrollPortion: (scroll + h) / (th)
        }
        setScrollPortion(result)
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScrollFactor)
        window.addEventListener("resize", handleScrollFactor)
        return () => {
            window.removeEventListener("scroll", handleScrollFactor)
            window.removeEventListener("resize", handleScrollFactor)
        }
    }, [])
    return scrollPortion
}
