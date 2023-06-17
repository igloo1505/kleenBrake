import { useEffect, useState } from "react"

interface ScrollFactor {
    allowed: boolean
    scrollablePixels: number
    scrollPortionDocument: number
    scrollPortionScreen: number
}

export const useScrollFactor = (): ScrollFactor | null => {
    if (typeof window === "undefined") return null;
    const [scrollPortion, setScrollPortion] = useState<ScrollFactor>({
        allowed: false,
        scrollablePixels: -1,
        scrollPortionDocument: -1,
        scrollPortionScreen: -1
    })
    const handleScrollFactor = () => {
        let h = window.innerHeight
        let th = document.body.clientHeight
        let scroll = window.scrollY
        let screen = scroll / h
        const result: ScrollFactor = {
            allowed: th > h,
            scrollablePixels: th - h,
            scrollPortionDocument: (scroll + h) / (th),
            scrollPortionScreen: screen >= 1 ? 1 : screen
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
