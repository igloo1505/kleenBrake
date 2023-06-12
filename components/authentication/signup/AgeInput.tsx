"use client"
import React from 'react'
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';


interface AgeInputProps {
    onChange: (e: InputNumberValueChangeEvent) => void
    value: any
}

const AgeInput = ({ onChange, value }: AgeInputProps) => {
    const options = []
    for (var i = 18; i <= 100; i++) {
        options.push(i)
    }
    return (
        <div className="flex flex-col w-full h-fit">
            <label htmlFor="age-input" className="block mb-2">Your age</label>
            <InputNumber inputId="age-input" value={value} onValueChange={onChange} mode="decimal" showButtons min={18} max={100} className={'w-full'} />
        </div>
    )
}



export default AgeInput;
