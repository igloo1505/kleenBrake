import React from 'react'
import { AppDataType } from '../../state/initial/appData';
import Button from '../io/Button';
import Link from 'next/link';



interface LowerCallToActionProps {
    callToAction: AppDataType['landing']['callToAction']
}

const LowerCallToAction = ({ callToAction }: LowerCallToActionProps) => {
    return (
        <div className={'flex flex-col justify-center items-center gap-6 md:gap-1 md:grid my-8 pl-8 pr-4'} style={{
            gridTemplateColumns: "1fr min(30vw, 300px)"
        }}>
            <div className={'flex flex-col justify-center items-start gap-2'}>
                <div className={'text-4xl'}>
                    {callToAction.title}
                    <div className={'mt-2 mb-4 w-full h-[4px] bg-[--primary-color] scale-x-50'} style={{
                        transformOrigin: "left"
                    }} />
                </div>
                <div className={'text-lg'}>{callToAction.body}</div>
            </div>
            <div className={'w-full h-full flex justify-center items-center'}>
                <Link href="/signup">
                    <Button label="Sign Up For Free" size="large" />
                </Link>
            </div>
        </div>
    )
}



export default LowerCallToAction;
