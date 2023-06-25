import { getActiveJobs, validateOrRedirect } from '#/utils/serverUtils';
import JobsTable from '@/portal/JobsTable';
import { redirect } from 'next/navigation';
import React from 'react'



interface PortalPageProps {

}

const PortalPage = async (props: PortalPageProps) => {
    const valid = await validateOrRedirect(["ADMIN", "EMPLOYEE"])
    if (!valid.user) {
        return redirect(valid.redirectPath || "/")
    }
    const jobs = await getActiveJobs()
    return (
        <div>
            <JobsTable activeJobs={jobs} />
        </div>
    )
}


PortalPage.displayName = "PortalPage"


export default PortalPage;
