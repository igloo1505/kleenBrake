import { DashboardComponent, ToastConfigType } from "#/types/UITypes"
import appData, { AppDataType } from "./appData"

export type initialUiStateType = {
    darkMode: boolean
    loading: boolean
    screenMessage: string | undefined
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
    dashboard: {
        activeComponent: DashboardComponent
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
    loading: false,
    screenMessage: undefined,
    hasDarkMode: true,
    lightId: "lightThemeId",
    darkId: "darkThemeId",
    appData: initialAppData as AppDataType,
    toast: {
        severity: "info",
        isOpen: false,
        content: "",
        title: "",
        timeout: 0
    },
    drawerOpen: false,
    modals: {
        termsOfService: false,
        privacy: false
    },
    dashboard: {
        activeComponent: "salesHistory"
    }
}

export type ModalKeyType = keyof initialUiStateType['modals']

export default initialUiState
