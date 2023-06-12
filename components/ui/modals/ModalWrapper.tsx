"use client"
import { useClickOutside } from 'primereact/hooks'
import React, { useRef } from 'react'
import { closeAllModals } from '../../../state/slices/ui'
import store from '../../../state/store'



interface ModalWrapperProps {
    children: React.ReactNode
    open: boolean
    title?: string
    confirmCallback?: (confirm: boolean) => void
    confirmLabel?: string
}

const ModalWrapper = ({ children, open, title, confirmCallback, confirmLabel }: ModalWrapperProps) => {
    const ref = useRef<HTMLDivElement>(null!)
    useClickOutside(ref, () => {
        store.dispatch(closeAllModals())
    })
    return (
        <div className={'fixed transition-all duration-500'} style={{
            top: "50%",
            left: "50%",
            transform: `translate(-50%, ${open ? "-50%" : "-100vh"})`,
            zIndex: 999,
            minWidth: "min(80vw, 768px)",
            /* minHeight: "400px" */
        }}
            ref={ref}
        >
            {title && <div className={'w-full px-4 py-4 text-2xl bg-[--primary-color] text-[--primary-color-text]'}>{title}</div>}
            <div className={'px-4 py-4 bg-white'}>
                {children}
            </div>
            {confirmCallback && (
                <div className={'w-full flex flex-row justify-end items-center'}>
                    <a role="button" onClick={() => confirmCallback(true)}>{confirmLabel ? confirmLabel : "Agree"}</a>
                </div>
            )
            }
        </div>
    )
}



export default ModalWrapper;
