import * as Types from "../types/reduxTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";
import initState from "../initial/initialState";
import { AppDataType } from "../initial/appData";
import { RootState } from "../store";
// import ToastConfig, { toastConfig } from "../types/ToastConfig";
const initialState = initState.UI;

const UIReducer = createReducer(initialState, (builder) => {
    builder.addCase(
        "TOGGLE_DARK_MODE",
        (state: typeof initialState, action: Types.TOGGLE_DARK_MODE) => {
            return {
                ...state,
                darkMode: !state.darkMode
            };
        }
    );
    builder.addCase(
        "SET_ACTIVE_THEME",
        (state: typeof initialState, action: Types.SET_ACTIVE_THEME) => {
            console.log("hasDarkMode:", Boolean(action.payload.darkId && action.payload.lightId), action.payload.darkId, action.payload.lightId)
            return {
                ...state,
                darkMode: action.payload.variant === "dark",
                lightId: action.payload.lightId,
                darkId: action.payload.darkId,
                hasDarkMode: Boolean(action.payload.darkId && action.payload.lightId),
            };
        }
    );
    builder.addCase(
        "SET_UI_APP_DATA",
        (state: typeof initialState, action: Types.SET_UI_APP_DATA) => {
            if (typeof window !== "undefined") {
                window.localStorage.setItem("UIAppData", JSON.stringify(action.payload))
            };
            return {
                ...state,
                appData: action.payload
            };
        }
    );
    builder.addCase(
        "SHOW_TOAST",
        (state: typeof initialState, action: Types.SHOW_TOAST) => {
            return {
                ...state,
                toast: action.payload
            };
        }
    );
    builder.addCase(
        "TOGGLE_DRAWER",
        (state: typeof initialState, action: Types.TOGGLE_DRAWER) => {
            return {
                ...state,
                drawerOpen: typeof action.payload !== "undefined" ? action.payload : !state.drawerOpen
            };
        }
    );
    builder.addCase(
        "TOGGLE_MODAL",
        (state: typeof initialState, action: Types.TOGGLE_MODAL) => {
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.payload]: !state.modals[action.payload]
                }
            };
        }
    );
    builder.addCase(
        "CLOSE_ALL_MODALS",
        (state: typeof initialState, action: Types.CLOSE_ALL_MODALS) => {
            // @ts-ignore
            let newModals: RootState['UI']['modals'] = {}
            Object.keys(state.modals).forEach((k) => {
                // @ts-ignore
                newModals[k] = false
            })
            return {
                ...state,
                modals: newModals
            };
        }
    );
});

export default UIReducer;
