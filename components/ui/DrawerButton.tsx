"use client"
import React from 'react'
import type { NavbarButtonType } from '../navigation/NavbarButton';
import Link from 'next/link';
import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import { InitialAuthStateType } from '../../state/initial/authState';

const connector = connect((state: RootState, props: any) => ({
    user: state.auth.user,
    props: props
}))


interface DrawerButtonProps {
    item: NavbarButtonType
    user: InitialAuthStateType['user']
}

const DrawerButton = connector(({ item, user }: DrawerButtonProps) => {
    return (
        <Link href={typeof item.href === "string" ? item.href : item.href(user?.username || "")}> {item.text}</Link>
    )
})



export default DrawerButton;
