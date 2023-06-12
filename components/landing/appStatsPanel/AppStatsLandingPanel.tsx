import React from 'react'
import AppStatItem from './AppStatItem'
import { AppStatItemType } from '../../../types/UITypes'



interface AppStatsLandingPanelProps {
    appStats: {
        items: AppStatItemType[]
    }
}


const AppStatsLandingPanel = ({ appStats }: AppStatsLandingPanelProps) => {
    return (
        <div className={'w-full pb-4 pt-0 mt-4 px-8 grid grid-cols-1 gap-2 md:gap-0 md:grid-cols-2 xl:grid-cols-4 place-items-center'}>
            {appStats.items.map((stat, i) => {
                return (
                    <AppStatItem item={stat} idx={i} key={`app-stat-item-${i}`} />
                )
            })}
        </div>
    )
}



export default AppStatsLandingPanel;
