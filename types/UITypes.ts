import { Transaction, User } from '@prisma/client'
import { IconType } from "react-icons/lib"

type SeverityType = "secondary" | "success" | "info" | "warning" | "help" | "danger"


export interface AppStatItemType {
    value: number | string
    label: string
    formatValue?: "number" | "dollar" | null | undefined
}


export interface ToastConfigType {
    severity?: "success" | "info" | "warn" | "error"
    content: string
    timeout?: number | null
    isOpen?: boolean
    title?: string
}


export type FeaturedLabelCategory = "buyer" | "seller" | "content"


export interface FeatureLabelType {
    label: string
    category: "buyer" | "seller" | "content"
}

export interface HighlightedFeatureType {
    title: string
    body: string
    iconClass?: string | null | undefined
}


export interface ReviewType {
    user: string
    body: string
    rating: number
    date: Date | number
    image: string
}

export interface ContributorType {
    name: string
    position: string
    imagePath?: string
    title: string
    body: string
}



export interface TransactionUserBound extends Transaction {
    user: User
}

export type DashboardComponent = "commission" | "descendants" | "salesHistory"

