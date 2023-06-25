"use client"
import { JobType } from '#/types/jobTypes'
import { formatDate, formatGoogleMapsQuery } from '#/utils/formatting'
import Button from '@/io/Button'
import TextItemDisplay from '@/ui/TextItemDisplay'
import React from 'react'



interface JobDetailsProps {
    job: JobType
}

const CardTitle = ({ children }: { children: string }) => {
    return (
        <div className={'text-xl font-semibold'}>{children}</div>
    )
}

const JobDetails = ({ job }: JobDetailsProps) => {
    console.log("job: ", job)
    return (
        <div className={'w-fit bg-[--surface-card] border-[--surface-border] border rounded-xl px-6 py-6 flex flex-col gap-4'}>
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                <TextItemDisplay
                    value={formatDate(job.dateSubmitted, true)}
                    label='Submitted On'
                />
                <TextItemDisplay
                    value={job.quantity}
                    label='Quantity'
                />
            </div>
            <div className={'grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-4'}>
                <div className={'w-full flex flex-col gap-2'}>
                    <CardTitle>Pick Up</CardTitle>
                    <div className={'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
                        <TextItemDisplay
                            value={formatDate(job.pickupWindow.start, true)}
                            label='Open'
                            noWrap
                        />
                        <TextItemDisplay
                            value={formatDate(job.pickupWindow.end, true)}
                            label='Close'
                            noWrap
                        />
                    </div>
                </div>
                <div className={'w-full flex flex-col gap-2'}>
                    <CardTitle>Drop Off</CardTitle>
                    <div className={'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
                        <TextItemDisplay
                            value={formatDate(job.dropOffWindow.start, true)}
                            label='Open'
                            noWrap
                        />
                        <TextItemDisplay
                            value={formatDate(job.dropOffWindow.end, true)}
                            label='Close'
                            noWrap
                        />
                    </div>
                </div>
            </div>
            <CardTitle>Location</CardTitle>
            <a href={formatGoogleMapsQuery(job.location)} target='_blank' className={'w-fit gap-4 flex flex-row justify-start items-center cursor-pointer'}>
                <TextItemDisplay
                    value={job.location.street}
                    label='Street'
                    noWrap
                    styles={{
                        container: {
                            width: "fit-content"
                        }
                    }}
                />
                <TextItemDisplay
                    value={job.location.zip}
                    label='Zip'
                    noWrap
                    styles={{
                        container: {
                            width: "fit-content"
                        }
                    }}
                />
                <TextItemDisplay
                    value={job.location.unit || "--"}
                    label='Unit'
                    noWrap
                    styles={{
                        container: {
                            width: "fit-content"
                        }
                    }}
                />
                <TextItemDisplay
                    value={job.location.entryCode || "--"}
                    label='Entry Code'
                    noWrap
                    styles={{
                        container: {
                            width: "fit-content"
                        }
                    }}
                />
            </a>
            <div className={'w-full flex flex-row justify-end items-center'}>
                {!job.datePickedUp &&
                    <Button label="Mark as Picked Up" />
                }
                {job.datePickedUp && !job.dateReturned &&
                    <Button label="Mark as Returned" />
                }
            </div>
        </div>
    )
}


JobDetails.displayName = "JobDetails"


export default JobDetails;
