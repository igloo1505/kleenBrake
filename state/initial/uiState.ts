import { ToastConfigType } from "../../types/UITypes"
import appData, { AppDataType } from "./appData"

export type initialUiStateType = {
    darkMode: boolean
    lightId: string | undefined | null
    darkId: string | undefined | null
    hasDarkMode: boolean
    appData: AppDataType
    toast: ToastConfigType
    drawerOpen: boolean
    modals: {
        termsOfService: boolean
        privacy: boolean
    }
}

let initialAppData = appData
if (typeof window !== "undefined") {
    let data = window.localStorage.getItem("UIAppData")
    if (data) {
        initialAppData = JSON.parse(data)
    }
}

const initialUiState: initialUiStateType = {
    darkMode: true,
    hasDarkMode: true,
    lightId: "lightThemeId",
    darkId: "darkThemeId",
    appData: initialAppData as AppDataType,
    toast: {
        severity: "info",
        timeout: 0,
        isOpen: false,
        content: "",
        title: ""
    },
    drawerOpen: false,
    modals: {
        termsOfService: false,
        privacy: false
    }
}

export type ModalKeyType = keyof initialUiStateType['modals']

export default initialUiState
