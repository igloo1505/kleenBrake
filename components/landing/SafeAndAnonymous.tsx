import React from 'react'
import { AppDataType } from '../../state/initial/appData';
import Image from 'next/image';
import backdrop from '../../public/assets/production/safeAndAnonymousBackdrop.jpg'


interface SafeAndAnonymousSectionProps {
    details: AppDataType['landing']['safeAndAnonymous']
}

const BackdropImage = () => {
    return (
        <div className={'w-full h-full absolute top-0 left-0 z-[-1]'}>
            <div className={'absolute w-full h-full bg-[--gray-900] opacity-80 z-[10]'}  />
            <Image
                src={backdrop}
                alt="Safe And Anonymous"
                className={'z-[-2] left-0 top-0 translate-y-[0] sm:translate-y-[-30%] object-cover w-full min-h-full min-w-full'}
                style={{
                    maxWidth: "unset"
                }}
            />
        </div>
    )
}

const SafeAndAnonymousSection = ({ details }: SafeAndAnonymousSectionProps) => {
    return (
        <div className={'text-white flex flex-col mt-7 py-28 justify-center items-center px-8 relative overflow-hidden'}>
            <BackdropImage />
            <div className={'flex flex-col justify-center items-center mb-8'}>
                <div className={'text-4xl'}>{details.title}</div>
                <div className={'w-full h-[4px] bg-[--primary-color] mt-2 my-4 scale-x-50'} />
            </div>
            <div className={'text-center text-lg'}>{details.body}</div>
        </div>
    )
}



export default SafeAndAnonymousSection;
