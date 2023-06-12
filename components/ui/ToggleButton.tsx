import React from 'react'
import { ToggleButton as PrimeToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
        


interface ToggleButtonProps {
    checked: boolean,
    onChange: (e: ToggleButtonChangeEvent) => void,
    id?: string,
    onLabel: string,
    offLabel: string,
    onIcon?: string,
    offIcon?: string,
    className?: string
}

const ToggleButton = (_props: ToggleButtonProps) => {
    let props = {..._props}
    if(!props.offIcon){
        props.offIcon = "pi pi-times"
    }

    if(!props.onIcon){
        props.onIcon = "pi pi-check"
    }
    if(!props.className){
        props.className = ""
    }
    props.className += " toggleButton"

    return (
        <PrimeToggleButton {...props}></PrimeToggleButton>
    )
}



export default ToggleButton;
