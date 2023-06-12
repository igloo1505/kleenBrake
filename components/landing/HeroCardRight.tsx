import Image from 'next/image';
import React from 'react'
import heroImage from '../../public/assets/development/heroPrimaryImage.jpg'


interface HeroCardRightProps {

}

const HeroCardRight = (props: HeroCardRightProps) => {
    return (
        <Image
            src={heroImage}
            alt="Panty Platform Image"
            className={'max-h-[400px] w-auto'}
        />
    )
}



export default HeroCardRight;
