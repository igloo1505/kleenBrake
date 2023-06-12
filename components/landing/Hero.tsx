import React from 'react'
import GenericCard from '../ui/Card';
import HeroCardLeft from './HeroCardLeft';
import HeroCardRight from './HeroCardRight';



interface HeroSectionProps {

}

const HeroSection = (props: HeroSectionProps) => {
    return (
        <GenericCard extraClasses={'w-screen lg:w-full'} extraStyles={{
            backgroundColor: "var(--highlight-bg)",
            borderRadius: 0
        }}>
            <div className={'w-full h-fit flex flex-col justify-center items-center lg:grid px-8 py-3 gap-8 text-[--highlight-text-color] hero-grid'}>
                <HeroCardLeft />
                <HeroCardRight />
            </div>
        </GenericCard>
    )
}



export default HeroSection;
