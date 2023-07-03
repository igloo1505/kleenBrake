"use client"
import { useClickOutside } from 'primereact/hooks'
import React, { useRef } from 'react'
import { closeAllModals } from '../../../state/slices/ui'
import store from '../../../state/store'


interface StylesInterface {
    container?: React.CSSProperties
    title?: React.CSSProperties
    buttonContainer?: React.CSSProperties
}

interface ModalWrapperProps {
    children: React.ReactNode
    open: boolean
    title?: string
    confirmCallback?: (confirm: boolean) => void
    confirmLabel?: string
    styles?: StylesInterface
}

const ModalWrapper = ({ children, open, title, styles, confirmCallback, confirmLabel }: ModalWrapperProps) => {
    const ref = useRef<HTMLDivElement>(null!)
    useClickOutside(ref, () => {
        store.dispatch(closeAllModals())
    })
    let rows = []
    title && rows.push("")
    rows.push("1fr")
    confirmCallback && rows.push("auto")
    return (
        <>
            <div className={'fixed grid transition-all duration-500 z-[1000]'}
                style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, ${open ? "-50%" : "-200vh"})`,
                    gridTemplateRows: `${rows.join(" ")}`,
                    minWidth: "min(80vw, 768px)",
                    maxHeight: "calc(100vh - 6rem)",
                    ...(styles?.container && { ...styles.container })
                }}
                ref={ref}
            >
                {title && <div className={'w-full px-4 py-4 text-2xl bg-[--primary-color] text-[--primary-color-text]'}
                    style={styles?.title ? styles.title : {}}
                >{title}</div>}
                <div
                    style={{
                        borderLeft: "1px solid var(--surface-border)",
                        borderRight: "1px solid var(--surface-border)",
                        borderBottom: "1px solid var(--surface-border)"
                    }}
                    className={'overflow-auto max-h-full'}
                >
                    {children}
                    {confirmCallback && (
                        <div className={'w-full flex flex-row justify-end items-center'}
                            style={styles?.buttonContainer ? styles.buttonContainer : {}}
                        >
                            <a role="button" onClick={() => confirmCallback(true)}>{confirmLabel ? confirmLabel : "Agree"}</a>
                        </div>
                    )
                    }
                </div>
            </div>
            <div className={'bg-[--backdrop-color] opacity-70 fixed h-full w-full top-0 left-0 transition-all duration-500 z-[999]'} style={{
                transform: `scale(${open ? 1 : 0})`
            }} />
        </>
    )
}



export default ModalWrapper;
