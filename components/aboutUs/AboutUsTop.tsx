"use client"
import { AppDataType } from '#/state/initial/appData'
import { initialUiStateType } from '#/state/initial/uiState'
import store, { RootState } from '#/state/store'
import { ContributorType } from '#/types/UITypes'
import Button from '@/io/Button'
import React from 'react'



interface AboutUsTopSectionProps {

}

const AboutUsTopSection = (props: AboutUsTopSectionProps) => {
    const state: RootState = store?.getState()
    let us: false | AppDataType['aboutUs'] = false
    if (state) {
        us = state?.UI?.appData?.aboutUs
    }
    if (!us) return null;

    return (
        <div className={'w-full flex flex-col justify-center items-center max-w-contentCol'}>
            <div className={'text-2xl md:text-3xl text-center mb-6 text-[--primary-color] font-bold'}>{us.missionTitle}</div>
            <div>{
                us.description.map((p, i) => {
                    return (
                        <div
                            className={'w-full indent-4 my-4'}
                            key={`aboutus-paragraph-${i}`}
                        >
                            {p}
                        </div>
                    )
                })
            }</div>
            <div className='my-4'>
                <Button label={us.bulletListTitle} severity='secondary' text className={'btn-override-subtitle text-xl md:text-2xl font-semibold'} />
            </div>
            <ul className={'w-full flex flex-col justify-start items-start gap-2'}>
                {us.bulletPoints.map((b, i) => {
                    return (
                        <li key={`aboutus-bullet-${i}`} className={'flex flex-row justify-start items-start gap-2'}>
                            <div className={'text-[--primary-color] font-bold'}>{`${i + 1}.`}</div>
                            <div>
                                {b}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div >
    )
}


AboutUsTopSection.displayName = "AboutUsTopSection"


export default AboutUsTopSection;
