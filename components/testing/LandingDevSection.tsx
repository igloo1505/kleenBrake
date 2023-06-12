import React from 'react'
import Button from '../io/Button';
import Link from 'next/link';



interface LandingDevSectionProps {

}

const LandingDevSection = (props: LandingDevSectionProps) => {
    return (
        <div className={'text-2xl my-6'}>
            <div className={'w-full text-center mb-4'}>
                For the development process only:
            </div>
            <div className={'w-full flex flex-row justify-center items-start gap-4'}>
                <Link href="/testing">
                    <Button label="Development Page" />
                </Link>
                <Link href="/content">
                    <Button label="Change the content" />
                </Link>
            </div>
        </div>
    )
}



export default LandingDevSection;
