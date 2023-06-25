"use client"
import React, { useEffect, useState } from 'react'
import DarkModeButton from './DarkModeButton'
import { FiMenu } from 'react-icons/fi'
import { toggleDrawer } from '../../state/actions/syncActions'
import NavbarButton, { LogoutButton, NavbarButtonType } from './NavbarButton'

const navbarBreakpoint = 768


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
    {
        text: "Referal Link",
        href: "/showRefererCode",
        authed: true,
        roles: ["REP"]
    },
    {
        text: "Employee",
        href: "/portal",
        authed: true,
        roles: ["EMPLOYEE", "ADMIN"]
    },
    {
        text: "Laundry Service",
        href: "/purchaseService",
        authed: true,
    },
    {
        text: "Dashboard",
        href: '/dashboard',
        authed: true,
        roles: ["ADMIN", "REP"]
    },
    {
        text: "My Profile",
        href: "/profile",
        authed: true,
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
            {
                viewportWidth >= navbarBreakpoint && <LogoutButton />
            }
            {viewportWidth < navbarBreakpoint && viewportWidth >= 0 && <FiMenu className={'cursor-pointer h-[2rem] w-auto'} onClick={() => toggleDrawer()} />}
        </div>
    )
}



export default NavbarButtonSection;
