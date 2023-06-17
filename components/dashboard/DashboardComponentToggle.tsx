import { handleDashboardComponent } from '#/state/actions/syncActions';
import { RootState } from '#/state/store';
import { DashboardComponent } from '#/types/UITypes'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

const connector = connect((state: RootState, props: any) => ({
    activeComponent: state.UI.dashboard.activeComponent,
    props: props
}))



interface DashboardComponentToggleProps {
    activeComponent: DashboardComponent
}

const DashboardComponentToggle = connector(({ activeComponent }: DashboardComponentToggleProps) => {
    const [previous, setPrevious] = useState<DashboardComponent>(null!)
    useEffect(() => {
        if (!previous) {
            setPrevious(activeComponent)
        }
        else {
            handleDashboardComponent(activeComponent, previous)
            setPrevious(activeComponent)
        }
    }, [activeComponent])
    return (
        <div>{activeComponent}</div>
    )
})


DashboardComponentToggle.displayName = "DashboardComponentToggle"


export default DashboardComponentToggle;
