import { RequestServiceFormData } from '#/types/jobTypes'
import React from 'react'
import { Calendar, CalendarChangeEvent } from 'primereact/calendar'
import { isMobile } from 'react-device-detect'

interface RequestServiceFormTwoProps {
    formData: RequestServiceFormData
    setFormData: (d: RequestServiceFormData) => void
    position: "left" | "center" | "right"
    window: "pickup" | "return"
}

const RequestServiceFormTwo = ({ formData, setFormData, window, position }: RequestServiceFormTwoProps) => {
    const tKey: keyof RequestServiceFormData = `${window}Window`
    const handleChange = (e: CalendarChangeEvent) => {
        const target = e.target as HTMLInputElement
        setFormData({
            ...formData,
            [`${window}Window`]: {
                ...formData[`${window}Window`],
                [target.name]: target.value
            }
        })
    }
    return (
        <div className={'px-8 py-4 min-w-fit flex flex-col justify-center items-center gap-4 absolute w-full h-full top-0 left-0 transition-transform duration-300'}
            style={{
                ...(position === "right" && { transform: "translateX(150%)" }),
                ...(position === "left" && { transform: "translateX(-150%)" }),
                ...(position === "center" && { transform: "translateX(0)" })
            }}
        >
            <div className={'flex flex-col justify-center items-start gap-2 min-w-fit w-fit'}>
                <label htmlFor="calendar-12h" className="font-bold block mb-2">
                    {window === "return" ? "Return Time" : "Pickup Time"}
                </label>
                <Calendar value={formData[tKey].start as string | null} touchUI={isMobile} stepMinute={15} onChange={handleChange} showTime hourFormat="12" />
            </div>
        </div>
    )
}


RequestServiceFormTwo.displayName = "RequestServiceFormTwo"


export default RequestServiceFormTwo;
