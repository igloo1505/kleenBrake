import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialState from "../initial/initialState";
import type { RetrievedUserData } from "../types/AuthTypes";
import { InitialAuthStateType } from "../initial/authState";
import { cookies } from "next/headers";

const slice = createSlice({
    name: "auth",
    initialState: initialState.auth as typeof initialState['auth'],
    reducers: {
        setAuthenticated(state, action: PayloadAction<boolean>) {
            state.authenticated = action.payload
        },
        loginSuccess(state, action: PayloadAction<RetrievedUserData>) {
            state.user = action.payload
            state.authenticated = true
        },
        logout(state) {
            // state.authenticated = initialState.auth.authenticated
            // state.user = initialState.auth.user
            Object.keys(initialState.auth).map((k) => {
                // @ts-ignore
                state[k] = initialState.auth[k]
            })
        }
    }
})

export const { setAuthenticated, loginSuccess, logout } = slice.actions
export default slice.reducer
