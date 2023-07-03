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
                <div className={'w-full mt-6 lg:mt-4 gap-4 grid grid-cols-1'}>
                    <div className={'gap-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'}>
                        <Link href="/signup">
                            <Button
                                label="Create an Account"
                                size="large"
                                className={'w-full h-full whitespace-break-spaces md:whitespace-nowrap'}
                            />
                        </Link>
                        <Link href="/login">
                            <Button
                                label="Login"
                                size="large"
                                className={'w-full h-full'}
                            />
                        </Link>
                    </div>
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
    )
})

HeroCardLeft.displayName = "HeroCardLeft"

export default HeroCardLeft;
