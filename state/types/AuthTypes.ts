import { getChildrenData } from "#/utils/serverUtils"
import type { Dashboard, Prisma, ROLE, User, Job, Lineage, Transaction } from "@prisma/client"

export type roleTypes = ROLE



export interface LoginUserData {
    email: string
    password: string
    rememberMe: boolean
}

export interface NewUserData {
    username: string
    password: string
    email: string
    refererId?: number
    age: string | number
    confirmAge: boolean
    agreeToTerms: boolean
}


export interface RetrievedUserData {
    id: string | number
    username: string
    password: string
    email: string
    age: string | number
    role: roleTypes
}


export interface CreateStripeCustomerType {
    name: string
}


export interface CancelSubscriptionResponse {
    cancelAt: number | null
    canceledAt: number | null
}

export interface ExtendedUser extends User {
    dashboard: Dashboard
}

export const DashboardIncludeTransactions = {
    include: {
        transactions: true
    }
}

export const JobIncludeAll: Prisma.JobInclude = {
    pickupWindow: true,
    dropOffWindow: true,
    location: true,
    pickedUpBy: true,
    droppedOffBy: true,
    submittedBy: true
}


export const UserIncludeAll: Prisma.UserInclude = {
    parent: true,
    children: true,
    dashboard: DashboardIncludeTransactions,
    jobsPickedUp: {
        include: JobIncludeAll
    },

    jobsDroppedOff: {
        include: JobIncludeAll
    },
    jobsRequested: {
        include: JobIncludeAll
    },
}

export type DashboardWithAll = (Dashboard & { transactions: Transaction[] })

export type UserWithAll = (User & {
    parent: User | null,
    children: UserWithAll[]
    dashboard: DashboardWithAll,
    jobsPickedUp: Job[] | null,
    jobsDroppedOff: Job[] | null,
    jobsRequested: Job[] | null,
})

export type DescendantTree = (User & { depth: number })[]

export interface UserWithDescendantTree extends User {
    descendants: DescendantTree
}

export type childrenDataType = Awaited<ReturnType<typeof getChildrenData>>
