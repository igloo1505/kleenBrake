import React, { ChangeEvent, ChangeEventHandler, FocusEventHandler, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { KeyFilterType } from 'primereact/keyfilter';
import clsx from 'clsx';



interface TextInputProps {
    type?: string,
    onChange: ChangeEventHandler
    name: string,
    label?: string,
    helperText?: string,
    value: string
    extraClasses?: string
    onFocus?: FocusEventHandler
    onBlur?: FocusEventHandler
    keyfilter?: KeyFilterType
    disabled?: boolean
    className?: string
}

const TextInput = (props: TextInputProps) => {
    const params = {
        id: `${props.name}-text-input`,
        ...(props.helperText && { 'aria-describedby': `${props.name}-text-input-helper` }),
        ...(props.extraClasses && { className: props.extraClasses }),
        ...(props.onFocus && { onFocus: props.onFocus }),
        ...(props.onBlur && { onBlur: props.onBlur }),
        ...(props.keyfilter && { keyfilter: props.keyfilter }),
        ...(props.disabled && { disabled: props.disabled }),
    }
    return (
        <div className={clsx('flex flex-col gap-2', props.className && props.className)}>
            {props.label && <label htmlFor={params.id}>{props.label}</label>}
            <InputText name={props.name} type={props.type ? props.type : "text"} value={props.value} onChange={props.onChange} {...params} />
            {props.helperText && <small id={params['aria-describedby']}>
                {props.helperText}
            </small>
            }
        </div>
    )
}



export default TextInput;
