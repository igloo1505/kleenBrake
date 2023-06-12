"use client"
import React from 'react'
import { ButtonProps, Button as PrimeButton } from 'primereact/button'


const Button = (props: ButtonProps) => {
    return (
        <PrimeButton {...props} />
    )
}



export default Button;
