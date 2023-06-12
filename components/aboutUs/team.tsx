"use client"
import store, { RootState } from '#/state/store'
import React from 'react'
import ContributorCard from './ContributorCard'
import { ContributorType } from '#/types/UITypes'


interface TeamProps {

}

const Team = (props: TeamProps) => {
    const state: RootState = store.getState()
    let team: ContributorType[] = []
    if (state) {
        team = state?.UI?.appData?.aboutUs?.contributors
    }
    return (
        <>
            {team.map((t: ContributorType, i) => {
                return (
                    <ContributorCard member={t} key={`contributor-card-${i}`} />
                )
            })}
        </>
    )
}


Team.displayName = "Team"


export default Team;
