"use client"
import React from 'react'
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';



interface ConfirmAgeProps {
    onChange: (e: CheckboxChangeEvent) => void
    value: boolean
}

const ConfirmAge = ({ value, onChange }: ConfirmAgeProps) => {
    return (
        <div className={'w-full my-2 grid gap-2'} style={{
            gridTemplateColumns: "auto 1fr"
        }}>
            <Checkbox checked={value} onChange={onChange} name="confirmAge" id="confirm-age-cb" />
            <div className={'font-thin'}>
                I confirm that I am atleast 18 years of age.
            </div>
        </div>
    )
}



export default ConfirmAge;
