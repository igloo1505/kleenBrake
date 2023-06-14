export type roleTypes = "USER" | "SELLER" | "ADMIN" | "BANNED"

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

// export interface ModelOffersTypes {

// }


export interface RetrievedUserData {
    username: string
    password: string
    email: string
    age: string | number
    role: roleTypes
}
