'use client'
import { useEffect } from 'react'



interface UnderlineGrowOnRenderProps {
    id: string
    extraClasses?: string
    timeout?: number
}

const UnderlineGrowOnRender = (props: UnderlineGrowOnRenderProps) => {
    useEffect(() => {
        if (typeof window === "undefined") return;
        const em = document.getElementById(props.id)
        if (!em) return;
        em.classList.remove("scale-x-0")
        em.classList.add("scale-x-1")
    }, [])
    return (
        <div>
            <div id={props.id} className={'w-full h-[4px] bg-[--primary-color] mt-2 scale-x-0'} style={{
                transition: "transform 0.3s ease-in-out"
            }} />
        </div>
    )
}



export default UnderlineGrowOnRender;
