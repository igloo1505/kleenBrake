import React, { ChangeEvent, ChangeEventHandler, FocusEventHandler, useState } from 'react'
import { InputTextarea } from 'primereact/inputtextarea';



interface TextAreaInputProps {
    autoResize?: boolean
    onChange: ChangeEventHandler
    name: string,
    label?: string,
    helperText?: string,
    value: string
    extraClasses?: string
    onFocus?: FocusEventHandler
    onBlur?: FocusEventHandler
}

const TextAreaInput = (props: TextAreaInputProps) => {
    const params = {
        id: `${props.name}-text-input`,
        ...(props.helperText && { 'aria-describedby': `${props.name}-text-input-helper` }),
        ...(props.extraClasses && { className: props.extraClasses }),
        ...(props.onFocus && { onFocus: props.onFocus }),
        ...(props.onBlur && { onBlur: props.onBlur }),
        ...(typeof props.autoResize !== "undefined" ? { autoResize: props.autoResize } : { autoResize: true })
    }
    return (
        <div className={'flex flex-col gap-2 w-full'}>
            {props.label && <label htmlFor={params.id}>{props.label}</label>}
            <InputTextarea name={props.name} value={props.value} onChange={props.onChange} {...params} />
            {props.helperText && <small id={params['aria-describedby']}>
                {props.helperText}
            </small>
            }
        </div>
    )
}



export default TextAreaInput;
