"use client"
/* BUG: This mask doesn't work at all! Fix this issue when back on wifi and can go through the docs. */
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
}

const InputMask = ({ id, onChange, keyfilter, onComplete, value, name, label, mask, slotChar }: InputMaskProps) => {
    const _mask = mask || "xxx-xxx-xxxx"
    const _slot = slotChar || "x"
    let params: {
        keyfilter?: KeyFilterType
    } = {}
    keyfilter && (params['keyfilter'] = keyfilter)

    return (
        <div className={'flex flex-col gap-2'}>
            <label htmlFor={id}>{label}</label>
            <PrimeInputMask name={name} autoClear={true} mask={_mask} slotChar={_slot} value={value} onChange={onChange} onComplete={onComplete} {...params} />
        </div>
    )
}


InputMask.displayName = "InputMask"


export default InputMask;
