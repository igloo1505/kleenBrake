import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "../initial/initialState";
import { AppDataType } from "../initial/appData";
import { DashboardComponent, ToastConfigType } from "../../types/UITypes";
import { ModalKeyType } from "../initial/uiState";
import type { RootState } from "../store";
import { JobType } from "#/types/jobTypes";

const slice = createSlice({
    name: "UI",
    initialState: initialState.UI as typeof initialState['UI'],
    reducers: {
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode
            if (typeof window === "undefined") return;
            if (state.lightId && state.darkId) {
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
            state.toast = {
                ...action.payload,
                ...(typeof action.payload?.isOpen === "undefined" && { isOpen: true }),
                ...(typeof action.payload?.severity === "undefined" && { severity: "info" }),
            }
        },
        publicError(state, action: PayloadAction<string>) {
            state.toast = {
                severity: "error",
                content: action.payload,
                isOpen: true
            }
        },
        toggleDrawer(state, action: PayloadAction<boolean | undefined>) {
            state.drawerOpen = typeof action.payload !== "undefined" ? action.payload : !state.drawerOpen
        },
        toggleModal(state, action: PayloadAction<ModalKeyType>) {
            state.modals = {
                ...state.modals,
                [action.payload]: !state.modals[action.payload]
            }
        },
        closeAllModals(state) {
            let newModals: Partial<RootState['UI']['modals']> = {}
            Object.keys(state.modals).forEach((k) => {
                // @ts-ignore
                newModals[k] = false
            })
            state.modals = newModals as RootState['UI']['modals']
        },
        setLoading(state, action: PayloadAction<boolean | undefined>) {
            state.loading = typeof action.payload === "undefined" ? false : action.payload
        },
        setScreenMessage(state, action: PayloadAction<string | undefined>) {
            state.screenMessage = action.payload
        },
        setActiveDashboardComponent(state, action: PayloadAction<DashboardComponent>) {
            state.dashboard.activeComponent = action.payload
        },
        setJobModal(state, action: PayloadAction<JobType | null>) {
            state.jobModal = action.payload
        }
    }
})

export const { toggleDarkMode, setJobModal, setActiveTheme, setScreenMessage, setLoading, setUIAppData, showToast, toggleDrawer, toggleModal, closeAllModals, setActiveDashboardComponent, publicError } = slice.actions
export default slice.reducer
