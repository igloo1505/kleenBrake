"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Button from '../io/Button'
import DarkModeButton from './DarkModeButton'
import { FiMenu } from 'react-icons/fi'
import { toggleDrawer } from '../../state/actions/syncActions'
import { roleTypes } from '../../state/types/AuthTypes'
import NavbarButton, { LogoutButton, NavbarButtonType } from './NavbarButton'

const navbarBreakpoint = 640


export const unAuthenticatedButtons: NavbarButtonType[] = [
    {
        text: "About Us",
        href: "/aboutUs",
        authed: "both"
    },
    {
        text: "Enroll Now",
        href: "/signup",
        authed: "both"
    },
    {
        text: "Login",
        href: "/login",
        authed: false
    },
    {
        text: "Dashboard",
        href: (id: string) => `/dashboard/${id}`,
        authed: true
    },
]




const NavbarButtonSection = () => {
    const [viewportWidth, setViewportWidth] = useState(-1)
    const setViewport = () => {
        if (typeof window === "undefined") return;
        let w = window.innerWidth
        if (w) {
            setViewportWidth(w)
        }
    }
    useEffect(() => {
        if (typeof window === "undefined") return;
        window.addEventListener("resize", () => {
            setViewport()
        })
        setViewport()
    }, [])
    return (
        <div className={'flex flex-row justify-end items-center gap-4'}>
            <DarkModeButton />
            {viewportWidth >= navbarBreakpoint && unAuthenticatedButtons.map((b, i) => {
                return <NavbarButton button={b} key={`navbar-button-${i}`} />
            })}
            <LogoutButton />
            {viewportWidth < navbarBreakpoint && viewportWidth >= 0 && <FiMenu className={'cursor-pointer'} onClick={() => toggleDrawer()} />}

        </div>
    )
}



export default NavbarButtonSection;
