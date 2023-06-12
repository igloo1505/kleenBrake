import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "../initial/initialState";
import type { RetrievedUserData } from "../types/AuthTypes";
import { InitialAuthStateType } from "../initial/authState";
import { AppDataType } from "../initial/appData";
import { ToastConfigType } from "../../types/UITypes";
import { ModalKeyType } from "../initial/uiState";
import type { RootState } from "../store";

const slice = createSlice({
    name: "UI",
    initialState: initialState.UI as typeof initialState['UI'],
    reducers: {
        toggleDarkMode(state) {
            console.log("In toggleDarkMode Uno")
            state.darkMode = !state.darkMode
            if (typeof window === "undefined") return;
            if (state.lightId && state.darkId) {
                console.log("In toggleDarkMode")
                let lightEm = document.getElementById(state.lightId) as HTMLLinkElement
                let darkEm = document.getElementById(state.darkId) as HTMLLinkElement
                lightEm.media = state.darkMode ? "" : "none"
                darkEm.media = state.darkMode ? "none" : ""
            }
        },
        setActiveTheme(state, action: PayloadAction<{
            id: string,
            variant: "light" | "dark",
            darkId: string | null | undefined,
            lightId: string | null | undefined
        }>) {
            state.darkMode = action.payload.variant === "dark"
            state.lightId = action.payload.lightId
            state.darkId = action.payload.darkId
            state.hasDarkMode = Boolean(action.payload.darkId && action.payload.lightId)
        },
        setUIAppData(state, action: PayloadAction<AppDataType>) {
            state.appData = action.payload
        },
        showToast(state, action: PayloadAction<ToastConfigType>) {
            state.toast = action.payload
        },
        toggleDrawer(state, action: PayloadAction<boolean | undefined>) {
            console.log("Toggling drawer: ", action.payload)
            state.drawerOpen = typeof action.payload !== "undefined" ? action.payload : !state.drawerOpen
        },
        toggleModal(state, action: PayloadAction<ModalKeyType>) {
            state.modals = {
                ...state.modals,
                [action.payload]: !state.modals[action.payload]
            }
        },
        closeAllModals(state) {
            let newModals: RootState['UI']['modals'] = {}
            Object.keys(state.modals).forEach((k) => {
                // @ts-ignore
                newModals[k] = false
            })
            state.modals = newModals
        }
    }
})

export const { toggleDarkMode, setActiveTheme, setUIAppData, showToast, toggleDrawer, toggleModal, closeAllModals } = slice.actions
export default slice.reducer
