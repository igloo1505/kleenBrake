"use client"
import React, { useEffect, useState } from 'react'
import DarkModeButton from './DarkModeButton'
import { FiMenu } from 'react-icons/fi'
import { toggleDrawer } from '../../state/actions/syncActions'
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
        authed: false
    },
    {
        text: "Login",
        href: "/login",
        authed: false
    },
    /* { */
    /*     text: "Show QR", */
    /*     href: "/showTransactionCode", */
    /*     authed: true, */
    /*     role: "ADMIN" */
    /* }, */

    {
        text: "My Profile",
        href: "/profile",
        authed: true,
    },
    {
        text: "Dashboard",
        href: (id: string | number) => `/dashboard/${id}`,
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
