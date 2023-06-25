import { prisma } from '#/db/db'
import { validateOrRedirect } from '#/utils/serverUtils'
import JobDetails from '@/portal/JobDetails'
import MediaModalWrapper from '@/ui/modals/MediaModalWrapper'
import { redirect } from 'next/navigation'
import React from 'react'



interface JobDetailsModalProps {
    params: {
        jobId: string
    }
}

const JobDetailsModal = async ({ params: {
    jobId
} }: JobDetailsModalProps) => {
    const valid = await validateOrRedirect(["ADMIN", "EMPLOYEE"])
    if (!valid.user) {
        return redirect(valid.redirectPath || "/")
    }
    const job = await prisma.job.findFirst({
        where: {
            id: parseInt(jobId)
        },
        include: {
            dropOffWindow: true,
            pickupWindow: true,
            location: true,
            pickedUpBy: true,
            droppedOffBy: true,
        }
    })
    if (!job) {
        return redirect("/portal")
    }
    return (
        <MediaModalWrapper allowLarge={true}>
            <JobDetails job={job} />
        </MediaModalWrapper>
    )
}


JobDetailsModal.displayName = "JobDetailsModal"


export default JobDetailsModal;
