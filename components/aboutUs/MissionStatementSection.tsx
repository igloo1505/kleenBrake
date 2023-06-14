import React from 'react'
import ParallaxMissionPhoto from './ParallaxMissionPhoto'
import store, { RootState } from '#/state/store'
import FullWidthBanner from '@/ui/FullWidthBanner'



const MissionStatementSection = () => {
    const state: RootState = store?.getState()

    return (
        <div className={'my-6 flex flex-col justify-center'}>
            <ParallaxMissionPhoto />
            <FullWidthBanner color="primary" size="lg" padding="xl">
                Mission Statement
            </FullWidthBanner>
            <div className={'flex flex-col justify-center items-center px-8 text-center mt-4 gap-2'} style={{
                maxWidth: "calc(100vw - 2rem)"
            }}>
                <div>{state?.UI?.appData?.aboutUs?.missionStatement || ""}</div>
                <div className={'text-primary font-bold text-xl'}>{state?.UI?.appData?.aboutUs?.missionStatementSlogan || ""}</div>
            </div>
        </div>
    )
}


MissionStatementSection.displayName = "MissionStatementSection"


export default MissionStatementSection;
