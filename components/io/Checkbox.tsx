import React from 'react'
import { CheckboxChangeEvent, Checkbox as PrimeCheckbox } from 'primereact/checkbox';



interface CheckboxProps {
    onChange: (e: CheckboxChangeEvent) => void
    label?: string
    value: boolean
    name: string
}

const Checkbox = (props: CheckboxProps) => {
    const id = `checkbox-input-${props.name}`
    return (
        <div className={'flex flex-row items-center justify-center'}>
            <PrimeCheckbox checked={props.value} onChange={props.onChange} inputId={id} name={props.name} />
            <label htmlFor={id} className="ml-2">{props.label || ""}</label>
        </div>
    )
}



export default Checkbox;
