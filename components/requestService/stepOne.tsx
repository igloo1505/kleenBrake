"use client"
import { RequestServiceFormData, states } from '#/types/jobTypes';
import TextInput from '@/io/TextInput';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import React, { ChangeEvent, useState } from 'react'



interface RequestFormOneProps {
    formData: RequestServiceFormData
    setFormData: (d: RequestServiceFormData) => void
    position: "left" | "center" | "right"
}

const stateNames = states.map((s) => s.name)

const RequestFormOne = ({ formData, setFormData, position }: RequestFormOneProps) => {
    const [suggestions, setSuggestions] = useState(stateNames)
    const handleLocation = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement
        setFormData({
            ...formData,
            location: {
                ...formData.location,
                [target.name]: target.value
            }
        })
    }

    const handleComplete = (item: AutoCompleteCompleteEvent) => {
        const regex = new RegExp(item.query, "gi")
        const newSuggestions = stateNames.filter((s) => regex.test(s))
        setSuggestions(newSuggestions.length === 0 ? [] : newSuggestions)
    }


    return (
        <div className={'px-8 py-4 min-w-fit flex flex-col justify-center items-center gap-4 transition-transform duration-300'}
            style={{
                ...(position === "right" && { transform: "translateX(150%)" }),
                ...(position === "left" && { transform: "translateX(-150%)" }),
                ...(position === "center" && { transform: "translateX(0)" })
            }}
        >
            <TextInput label="Name" name={"name"} value={formData.name} className={'w-full'} onChange={(e) => {
                const target = e.target as HTMLInputElement
                setFormData({
                    ...formData,
                    name: target.value
                })
            }} />

            <TextInput label="Street Address" name={"street"} value={formData.location.street} className={'w-full'} onChange={(e) => {
                const target = e.target as HTMLInputElement
                setFormData({
                    ...formData,
                    location: {
                        ...formData.location,
                        street: target.value
                    }
                })
            }} />
            <div className={'w-full grid grid-rows-2 grid-cols-1 sm:grid-cols-[1fr_240px] sm:grid-rows-1 gap-4'}>
                <TextInput label="City" name={"city"} className={'w-full'} value={formData.location.city} onChange={handleLocation} />
                <div className={'flex flex-col justify-center items-start gap-2 min-w-fit w-full'}>
                    <label className={''} htmlFor='location-zip-input'>State</label>
                    <AutoComplete dropdown={true} className={'w-full'} suggestions={suggestions} name={"state"} completeMethod={handleComplete} value={formData.location.state} onChange={(e: AutoCompleteChangeEvent) => {
                        setFormData({
                            ...formData,
                            location: {
                                ...formData.location,
                                state: e.value
                            }
                        })
                    }} />
                </div>
            </div>
            <div className={'w-full grid grid-cols-1 sm:grid-cols-2 min-w-fit gap-4'}>
                <div className={'flex flex-col justify-center items-start gap-2 min-w-fit w-full'}>
                    <label className={''} htmlFor='location-zip-input'>Zip</label>
                    <InputNumber value={formData.location.zip} id="location-zip-input" className={'w-full'} name="zip" onValueChange={(e: InputNumberValueChangeEvent) => {
                        if (`${e.value}`.length < 5) {
                            setFormData({
                                ...formData,
                                location: {
                                    ...formData.location,
                                    zip: e.value || formData.location.zip
                                }
                            }
                            )
                        }
                    }
                    } useGrouping={false} />
                </div>
                <TextInput label="Unit" name={"unit"} className={'w-full'} value={formData.location.unit || ""} onChange={handleLocation} />
            </div>
        </div>
    )
}


RequestFormOne.displayName = "RequestFormOne"


export default RequestFormOne;
