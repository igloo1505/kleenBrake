"use client"
import React from 'react'
import { DataTable, DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { JobType, maxJobsPerPage } from '#/types/jobTypes';
import { useRouter } from 'next/navigation';
import { formatDate } from '#/utils/formatting';


interface JobsTableProps {
    activeJobs: JobType[]
}

const DateTemplate = ({ d, time, falseIfNull }: { d?: Date | null | undefined, time?: boolean, falseIfNull?: boolean }) => {
    if (!d) {
        return falseIfNull ? <div>False</div> : <div>--</div>
    }
    const parsed = formatDate(d, time || false)
    return (
        <div>{parsed}</div>
    )
}

const SubmittedOn = (j: JobType) => {
    return <DateTemplate d={j?.dateSubmitted} time={true} />
}


const PickedUpOn = (j: JobType) => {
    return <DateTemplate d={j?.datePickedUp} time={true} falseIfNull={true} />
}
const DroppedOffOn = (j: JobType) => {
    return <DateTemplate d={j?.dateReturned} time={true} falseIfNull={true} />
}

const LocationCol = (j: JobType) => {
    return <div>{j.location.zip}</div>
}

const JobsTable = ({ activeJobs }: JobsTableProps) => {
    const router = useRouter()
    if (!activeJobs) {
        return null
    }
    const handleSelect = (e: any) => {
        const val = e.value
        router.push(`/jobs/${val?.id as number}`)
    }
    return (
        <div className={'px-6'}>
            <DataTable
                paginator
                rows={maxJobsPerPage}
                selectionMode='single'
                onSelectionChange={handleSelect}
                value={activeJobs}
                tableStyle={{ minWidth: '50rem' }}>
                <Column key={'dateSubmitted'} field="dateSubmitted" header="Submitted" body={SubmittedOn}></Column>
                <Column key={'datePickedUp'} field="datePickedUp" header="Picked Up" body={PickedUpOn}></Column>
                <Column key={'dateReturned'} field="dateReturned" header="Returned" body={DroppedOffOn}></Column>
                <Column key={'location'} field="location" header="Location" body={LocationCol}></Column>
            </DataTable>
        </div>
    )
}


JobsTable.displayName = "JobsTable"


export default JobsTable;
