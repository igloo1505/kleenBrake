"use client"
import clsx from 'clsx'
import { InputMask as PrimeInputMask, InputMaskChangeEvent, InputMaskCompleteEvent } from 'primereact/inputmask'
import { KeyFilterType } from 'primereact/keyfilter'
import React from 'react'



interface InputMaskProps {
    id: string
    onChange: (e: InputMaskChangeEvent) => void
    onComplete: (e: InputMaskCompleteEvent) => void
    label: string
    name: string
    value: string | undefined
    mask?: string
    slotChar?: string
    keyfilter?: KeyFilterType
    className?: string
}

const InputMask = ({ id, onChange, className, keyfilter, onComplete, value, name, label, mask, slotChar }: InputMaskProps) => {
    const _mask = mask || "xxx-xxx-xxxx"
    const _slot = slotChar || "x"
    let params: {
        keyfilter?: KeyFilterType
    } = {}
    keyfilter && (params['keyfilter'] = keyfilter)

    return (
        <div className={clsx('flex flex-col gap-2', className && className)}>
            <label htmlFor={id}>{label}</label>
            <PrimeInputMask name={name} autoClear={true} mask={_mask} slotChar={_slot} value={value} onChange={onChange} onComplete={onComplete} {...params} />
        </div>
    )
}


InputMask.displayName = "InputMask"


export default InputMask;
