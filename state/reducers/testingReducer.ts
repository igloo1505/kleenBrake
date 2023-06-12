import * as Types from "../types/reduxTypes";
import { createReducer } from "@reduxjs/toolkit";
import initState from "../initial/initialState";
const initialState = initState.development;

const DevReducer = createReducer(initialState, (builder) => {
    builder.addCase(
        "SET_ACTIVE_THEME",
        (state: typeof initialState, action: Types.SET_ACTIVE_THEME) => {
            if (typeof window !== "undefined") {
                window.localStorage.setItem("currentTheme", action.payload.id)
            }
            return {
                ...state,
                active_theme: action.payload.id,
                theme_variant: action.payload.variant,
                darkId: action.payload.darkId,
                lightId: action.payload.lightId
            };
        }
    );
    builder.addCase(
        "SET_CHANGE_MODAL_ACTIVE",
        (state: typeof initialState, action: Types.SET_CHANGE_MODAL_ACTIVE) => {
            return {
                ...state,
                change_content_modal: action.payload
            };
        }
    );
});

export default DevReducer;
