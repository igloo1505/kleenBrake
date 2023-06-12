"use client"
import React, { useRef } from 'react'
import { unAuthenticatedButtons } from '../navigation/NavbarButtonSection';
import DrawerButton from './DrawerButton';
import { connect } from 'react-redux';
import store, { RootState } from '../../state/store';
import { toggleDrawer } from '../../state/actions/syncActions';
import { useClickOutside } from 'primereact/hooks'
import { Sidebar } from 'primereact/sidebar';

const connector = connect((state: RootState, props: any) => ({
    drawerOpen: state.UI.drawerOpen,
    props: props
}))


interface DrawerProps {
    drawerOpen: boolean
}


const Drawer = connector(({ drawerOpen }: DrawerProps) => {
    const ref = useRef<HTMLDivElement>(null!)
    useClickOutside(ref, () => {
        if (drawerOpen) {
            toggleDrawer(false)
        }
    }
    )
    return (
        <Sidebar visible={drawerOpen} onHide={() => toggleDrawer(false)} className={'drawer-container'}>
            <div className={'flex flex-col justify-start items-start gap-2 pr-6 text-xl'}>
                {unAuthenticatedButtons.map((b, i) => {
                    return <DrawerButton item={b} key={`drawer-button-${i}`} />
                })}
            </div>
        </Sidebar>
    )
})

Drawer.displayName = "Drawer"

export default Drawer;
