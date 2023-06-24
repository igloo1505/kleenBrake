"use client"
import React, { useEffect, useState } from 'react'
import { NavbarButtonType, shouldDisplay } from '../navigation/NavbarButton';
import Link from 'next/link';
import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import { InitialAuthStateType } from '../../state/initial/authState';

const connector = connect((state: RootState, props: any) => ({
    user: state.auth.user,
    authed: state.auth.authenticated,
    props: props
}))


interface DrawerButtonProps {
    item: NavbarButtonType
    authed: boolean
    user: InitialAuthStateType['user']
}

const DrawerButton = connector(({ item, user, authed }: DrawerButtonProps) => {
    const [display, setDisplay] = useState(false)
    useEffect(() => setDisplay(shouldDisplay(item, authed, user)), [authed, user])
    if (!display) {
        return null
    }
    return (
        <Link href={typeof item.href === "string" ? item.href : item.href(user?.username || "")}> {item.text}</Link>
    )
})



export default DrawerButton;
