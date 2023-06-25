import { prisma } from '#/db/db'
import { validateOrRedirect } from '#/utils/serverUtils'
import JobDetails from '@/portal/JobDetails'
import { redirect } from 'next/navigation'
import React from 'react'



interface JobDetailsPageProps {
    params: {
        jobId: string
    }
}

const JobDetailsPage = async ({ params: {
    jobId
} }: JobDetailsPageProps) => {
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
        <div className={'flex justify-center items-center'}>
            <JobDetails job={job} />
        </div>
    )
}


JobDetailsPage.displayName = "JobDetailsPage"


export default JobDetailsPage;
