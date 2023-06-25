import { Job, Prisma, Window, Location, User } from "@prisma/client"

export const maxJobsPerPage = 10

type exludeFromJob = "pickupWindow" | "dropOffWindow" | "location" | "pickedUpBy" | "droppedOffBy"

export interface CreateJobType {
    job: Omit<Prisma.JobCreateInput, exludeFromJob>
    pickup: Prisma.WindowCreateInput
    dropoff: Prisma.WindowCreateInput
    location: (Prisma.LocationCreateWithoutJobInput & { id?: number })
}


export type JobType = (Job & { dropOffWindow: Window, pickupWindow: Window, location: Location, pickedUpBy: User | undefined | null, droppedOffBy?: User | undefined | null })

