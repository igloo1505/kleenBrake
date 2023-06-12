import React from 'react'
/* import { getAppData } from '../../../state/actions/developmentActions'; */
import store from 'state/store';

interface SignupTitleProps {
}

const SignupTitle = (props: SignupTitleProps) => {
    /* const appData = getAppData() */
    const appData = store?.getState()?.UI?.appData
    return (
        <div className={'w-full flex flex-col justify-center items-center gap-2'}>
            <div>
                <div className={'text-2xl'}>{appData?.authentication?.signup?.title}</div>
                <div className={'w-[120%] h-[3px] bg-[--primary-color] translate-x-[-10%]'} />
            </div>
            <div className={'text-lg'}>{appData?.authentication?.signup?.subtitle}</div>
        </div>
    )
}



export default SignupTitle;
