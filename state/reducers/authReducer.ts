import * as Types from "../types/reduxTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";
import initState from "../initial/initialState";
// import ToastConfig, { toastConfig } from "../types/ToastConfig";
const initialState = initState.auth;

const AuthReducer = createReducer(initialState, (builder) => {
    builder.addCase(
        "SET_AUTHENTICATED",
        (state: typeof initialState, action: Types.SET_AUTHENTICATED) => {
            return {
                ...state,
                authenticated: action.payload
            };
        }
    );
    builder.addCase(
        "LOGIN_SUCCESS",
        (state: typeof initialState, action: Types.LOGIN_SUCCESS) => {
            return {
                ...state,
                user: action.payload,
                authenticated: true
            };
        }
    );
    builder.addCase(
        "LOGOUT",
        (state: typeof initialState, action: Types.LOGOUT) => {
            return {
                ...initialState,
            };
        }
    );

});

export default AuthReducer;
