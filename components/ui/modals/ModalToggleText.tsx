"use client"
import React from 'react'
/* import store, { RootState } from '../../../state/store' */
import clsx from 'clsx'
import { toggleModal } from '../../../state/slices/ui'
import { ModalKeyType } from '../../../state/initial/uiState'
import store from '../../../state/store'



interface ModalToggleTextProps {
    children: string
    classes?: string
    modalName: ModalKeyType
    primary?: boolean
    bold?: boolean
}


const ModalToggleText = ({ children, classes, modalName, primary, bold }: ModalToggleTextProps) => {
    const handleClick = () => {
        store.dispatch(toggleModal(modalName))
    }
    return (
        <a role="button" className={clsx(primary && "text-[--primary-color]", bold && "font-bold", classes && classes)} onClick={handleClick}>{children}</a>
    )
}



export default ModalToggleText;
