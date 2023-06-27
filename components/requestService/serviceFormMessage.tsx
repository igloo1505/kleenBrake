import { RequestServiceFormData } from '#/types/jobTypes'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'


interface RequestServiceFormTwoProps {
    formData: RequestServiceFormData
    setFormData: (d: RequestServiceFormData) => void
    position: "left" | "center" | "right"
}


const RequestServiceFormMessage = ({ formData, setFormData, position }: RequestServiceFormTwoProps) => {
    return (
        <div className={'px-8 py-4 min-w-fit gap-4 absolute w-full h-full top-0 left-0 grid grid-rows-[auto_1fr_auto] transition-transform duration-300'}
            style={{
                ...(position === "right" && { transform: "translateX(150%)" }),
                ...(position === "left" && { transform: "translateX(-150%)" }),
                ...(position === "center" && { transform: "translateX(0)" })
            }}
        >
            <div className={'w-full text-center text-2xl h-fit'}>Optional</div>
            <div className={'flex flex-col justify-center items-start gap-2 min-w-fit w-full h-full'}>
                <label className={''} htmlFor='location-zip-input'>Message</label>
                <InputTextarea value={formData.message} onChange={(e) => {
                    setFormData({
                        ...formData,
                        message: e.target.value
                    })
                }} className={'w-full h-full'} />
            </div>
            <div className={'w-full flex flex-col justify-center items-start h-fit'}>
                <div className={'flex flex-col justify-center items-start gap-2 min-w-fit w-fit'}>
                    <label htmlFor='location-zip-input'>Entry Code</label>
                    <InputText value={`${formData.location.entryCode || ""}`} onChange={(e) => {
                        setFormData({
                            ...formData,
                            location: {
                                ...formData.location,
                                entryCode: e.target.value
                            }
                        })
                    }} className={'w-full'} />
                </div>
            </div>
        </div>
    )
}


RequestServiceFormMessage.displayName = "RequestServiceFormTwo"


export default RequestServiceFormMessage

