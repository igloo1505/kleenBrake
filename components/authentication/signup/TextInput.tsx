"use client"
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import clsx from 'clsx'

interface SignupTextInputProps {
    id: string
    value: string
    name: string
    onChange: ChangeEventHandler
    label?: string
    helper?: string
    classes?: {
        container?: string
        input?: string
        helper?: string
    }
    validate?: (v: string) => boolean
    isPassword?: boolean
}

const SignupTextInput = (props: SignupTextInputProps) => {
    const [isValid, setIsValid] = useState(true)
    useEffect(() => {
        if (props.validate) {
            let valid = props.validate(props.value)
            console.log("Inside heree...", valid)
            setIsValid(valid || props.value.length <= 3)
        }
    }, [props.value])
    return (
        <div className={clsx("flex flex-col gap-2 max-w-full w-full", props.classes?.container && props.classes.container, props.isPassword && "password-full")}>
            {props.label && (
                <label htmlFor={props.id}>{props.label}</label>
            )
            }
            {props.isPassword ?
                <Password id={props.id} aria-describedby={`${props.id}-help`} onChange={props.onChange} name={props.name} value={props.value} className={clsx("w-full m-0", !isValid && "p-invalid")} /> :
                <InputText id={props.id} aria-describedby={`${props.id}-help`} onChange={props.onChange} name={props.name} value={props.value} className={clsx(!isValid && "p-invalid")} />
            }
            {props?.helper && (
                <small id={`${props.id}-help`}>
                    {props.helper}
                </small>
            )
            }
        </div>
    )
}



export default SignupTextInput;
