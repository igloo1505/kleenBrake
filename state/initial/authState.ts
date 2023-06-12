import { RetrievedUserData } from "../types/AuthTypes"

export interface InitialAuthStateType {
    authenticated: boolean
    user?: RetrievedUserData
}

const authState: InitialAuthStateType = {
    authenticated: false,
    user: undefined
}


export default authState
