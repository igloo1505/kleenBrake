import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "../initial/initialState";
import type { RetrievedUserData } from "../types/AuthTypes";
import { InitialAuthStateType } from "../initial/authState";
import { ChangeModalType } from "../types/reduxTypes";

const slice = createSlice({
    name: "development",
    initialState: initialState.development as typeof initialState['development'],
    reducers: {
        setActiveTheme: (state, action: PayloadAction<{
            id: string,
            variant: "light" | "dark",
            darkId: string | null | undefined,
            lightId: string | null | undefined
        }>) => {

            if (typeof window !== "undefined") {
                window.localStorage.setItem("currentTheme", action.payload.id)
            }

            return {
                ...state,
                active_theme: action.payload.id,
                theme_variant: action.payload.variant,
                darkId: action.payload.darkId,
                lightId: action.payload.lightId
            }
        },
        setChangeModalActive: (state, action: PayloadAction<ChangeModalType>) => ({
            ...state,
            change_content_modal: action.payload
        })
    }
})

export const { setActiveTheme, setChangeModalActive } = slice.actions
export default slice.reducer
