"use client"
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import Photo from '#/public/assets/development/genericBusinessPeople.jpg'
import { useScrollFactor } from '#/utils/hooks'


const ParallaxMissionPhoto = () => {
    const ref = useRef<HTMLImageElement>(null!)
    const container = useRef<HTMLDivElement>(null!)

    const adjustImage = (pos: ReturnType<typeof useScrollFactor>) => {
        if (!pos?.allowed) return
        const shift = ref.current.height - container.current.getBoundingClientRect().height
        ref.current.style.transform = `translateY(-${shift * pos.scrollPortionDocument}px)`
    }

    adjustImage(useScrollFactor())

    return (
        <div className={'object-cover w-screen overflow-hidden max-h-[200px] md:max-h-[400px]'}
            ref={container}
        >
            <Image src={Photo} alt="Business People Doing Business" ref={ref} className={'object-cover will-change-scroll'} />
        </div>
    )
}


ParallaxMissionPhoto.displayName = "ParallaxMissionPhoto"


export default ParallaxMissionPhoto;

