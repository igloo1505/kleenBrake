import { AppDataType } from "../initial/appData";
import { FeaturedLabelCategory, ToastConfigType } from "../../types/UITypes";
import { RetrievedUserData } from "./AuthTypes";

export type SET_AUTHENTICATED = { type: "SET_AUTHENTICATED"; payload: boolean };
export type LOGIN_SUCCESS = { type: "LOGIN_SUCCESS", payload: RetrievedUserData }
export type INVALID_CREDENTIALS = { type: "INVALID_CREDENTIALS" }
export type LOGOUT = { type: "LOGOUT" }


// SECTION: Ui Stuff
export type TOGGLE_DARK_MODE = { type: "TOGGLE_DARK_MODE" };
export type SHOW_TOAST = { type: "SHOW_TOAST", payload: ToastConfigType };
export type TOGGLE_DRAWER = { type: "TOGGLE_DRAWER", payload?: boolean };
export type TOGGLE_MODAL = { type: "TOGGLE_MODAL", payload: "termsOfService" | "privacy" }
export type CLOSE_ALL_MODALS = { type: "CLOSE_ALL_MODALS" }


// SECTION: Error Stuff
export type NETWORK_ERROR = { type: "NETWORK_ERROR" }




// SECTION: Testing and Development Only
//
export type ActiveThemeType = {
    id: string
    variant: "light" | "dark",
    darkId: string | null | undefined,
    lightId: string | null | undefined
}

export type SET_ACTIVE_THEME = {
    type: "SET_ACTIVE_THEME", payload: {
        id: string,
        variant: "light" | "dark",
        darkId: string | null | undefined,
        lightId: string | null | undefined
    }
}


export type SET_UI_APP_DATA = {
    type: "SET_UI_APP_DATA",
    payload: AppDataType
}


export interface ChangeModalType {
    label: string
    value: string
    isOpen: boolean
    name: string
    parentName?: keyof AppDataType | null
    itemIndex?: number | null | undefined
    isAppStat?: string | null | undefined | boolean
    isChangeFeatureLabel?: FeaturedLabelCategory | null | undefined
    isAddFeatureLabel?: FeaturedLabelCategory | null | undefined
    subKey?: string | null | undefined
}


export type SET_CHANGE_MODAL_ACTIVE = {
    type: "SET_CHANGE_MODAL_ACTIVE",
    payload: ChangeModalType

}



