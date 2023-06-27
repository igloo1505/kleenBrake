"use client"
import React from 'react'
import LeftBottomUnderlinedText from '../ui/LeftBottomUnderlinedText';
import Button from '../io/Button';
import Link from 'next/link';
import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import { AppDataType } from '../../state/initial/appData';

const connector = connect((state: RootState, props: any) => ({
    appData: state.UI.appData,
    props: props
}))


interface HeroCardLeftProps {
    appData: AppDataType
}

const HeroCardLeft = connector(({ appData }: HeroCardLeftProps) => {
    return (
        <div className={'w-fit h-full flex flex-col justify-start items-start py-4'}>
            <LeftBottomUnderlinedText text={appData.landing.heroMainTitle} textClasses="w-fit text-2xl font-bold" underlineColor={"var(--highlight-text-color)"} />
            {appData.landing.heroSubTitle && <div className={'w-full pl-3 mt-2 text-xl'}>
                {appData.landing.heroSubTitle}
            </div>}
            {appData.landing.heroCardBody && <div className={'w-full mt-2'}>
                {appData.landing.heroCardBody}
            </div>}
            <div className={'w-full flex flex-row justify-end'}>
                <div className={'w-full flex flex-col justify-center gap-3 items-center mt-6 lg:mt-4'}>
                    <div className={'w-full sm:w-fit grid grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-4'}>
                        <Link href="/signup" className={'w-full h-full'}>
                            <Button
                                label="Create an Account"
                                size="large"
                                className={'w-full h-full whitespace-break-spaces md:whitespace-nowrap'}
                            />
                        </Link>
                        <Link href="/login" className={'w-full h-full'}>
                            <Button
                                label="Login"
                                size="large"
                                className={'w-full h-full'}
                            />
                        </Link>
                    </div>
                    <div className={'w-full h-fit'}>
                        <Link href="/requestService">
                            <Button
                                label="Request Service"
                                size="large"
                                className={'w-full h-full'}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
})

HeroCardLeft.displayName = "HeroCardLeft"

export default HeroCardLeft;
