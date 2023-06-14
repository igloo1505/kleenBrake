"use client"
import store, { RootState } from '#/state/store'
import React from 'react'
import ContributorCard from './ContributorCard'
import { ContributorType } from '#/types/UITypes'
import FullWidthBanner from '@/ui/FullWidthBanner'


const Team = () => {
    const state: RootState = store.getState()
    let team: ContributorType[] = []
    if (state) {
        team = state?.UI?.appData?.aboutUs?.contributors
    }
    return (
        <div className={'w-full flex flex-col justify-center items-center px-4'}>
            <FullWidthBanner color="primary" size="xl" padding="md" fit className={'my-6 rounded-lg'}>
                Our Team
            </FullWidthBanner>
            <div className={'w-full flex flex-col justify-center items-center gap-4'}>
                {team.map((t: ContributorType, i) => {
                    return (
                        <ContributorCard member={t} key={`contributor-card-${i}`} />
                    )
                })}
            </div>
        </div>
    )
}


Team.displayName = "Team"


export default Team;
