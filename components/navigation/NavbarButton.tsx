"use client"
import React, { useEffect, useState } from 'react'
import { roleTypes } from '../../state/types/AuthTypes'
import Link from 'next/link'
import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import { InitialAuthStateType } from '../../state/initial/authState';
import { logoutUser } from '../../state/actions/authActions';

const connector = connect((state: RootState, props: any) => ({
    auth: state.auth,
    props: props
}))

export interface NavbarButtonType {
    text: string,
    href: string | ((id: string) => string)
    authed: boolean | "both"
    role?: roleTypes | undefined
}

export const shouldDisplay = (button: NavbarButtonType, authenticated: boolean, user: InitialAuthStateType['user']) => {
    return (button.authed === "both" || button.authed === authenticated) && (!button.role || button.role === user?.role)
}


const NavbarButton = connector(({ button, auth: { authenticated, user } }: { button: NavbarButtonType, auth: InitialAuthStateType }) => {
    console.log("authenticated: ", authenticated)
    const [display, setDisplay] = useState(false)
    useEffect(() => setDisplay(shouldDisplay(button, authenticated, user)), [authenticated, user])
    if (!display) {
        return null
    }
    return (
        <Link href={typeof button.href === "string" ? button.href : button.href(user?.username || "")}>{button.text}</Link>
    )

})


export const LogoutButton = connector(({ auth: { authenticated } }: { auth: InitialAuthStateType }) => {
    const [display, setDisplay] = useState(false)
    useEffect(() => setDisplay(authenticated), [authenticated])
    if (!display) {
        return null
    }
    return (
        <a role="button" onClick={logoutUser}>{'Log Out'}</a>
    )
})


export default NavbarButton;
