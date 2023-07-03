"use client"
import { RequestServiceFormData, states } from '#/types/jobTypes';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import React from 'react'



interface RequestFormOneProps {
    formData: RequestServiceFormData
    setFormData: (d: RequestServiceFormData) => void
    position: "left" | "center" | "right"
}


const QuantityInput = ({ formData, setFormData, position }: RequestFormOneProps) => {
    return (
        <div className={'px-8 py-4 min-w-fit h-full w-full flex flex-col justify-center items-center gap-4 transition-transform duration-300 absolute'}
            style={{
                ...(position === "right" && { transform: "translateX(150%)" }),
                ...(position === "left" && { transform: "translateX(-150%)" }),
                ...(position === "center" && { transform: "translateX(0)" })
            }}
        >
            <div className={'w-full h-full flex flex-col justify-center items-center gap-4'}>
                <div className={'w-full h-fit text-3xl font-semibold text-center'}>How many bags of laundry?</div>
                <InputNumber value={formData.quantity} onValueChange={(e: InputNumberValueChangeEvent) => setFormData({ ...formData, quantity: e.value || 1 })} showButtons buttonLayout="horizontal" step={1} min={1}
                    decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                />
            </div>
        </div>
    )
}


QuantityInput.displayName = "RequestFormOne"


export default QuantityInput;
