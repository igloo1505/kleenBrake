import type { Dashboard, ROLE, User } from "@prisma/client"

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
