import { DashboardStyleType, getDashboardStyles } from "#/types/UITypes"
import { useEffect, useState } from "react"

export const useDashboardStyles = () => {
    const [styles, setStyles] = useState<false | DashboardStyleType>(false)
    useEffect(() => {
        const _styles = getDashboardStyles()
        if (_styles) {
            setStyles(_styles)
        }
    }, [])
    return styles
}
