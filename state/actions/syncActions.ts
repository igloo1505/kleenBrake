import store from "../store"
import { toggleDarkMode as tdm } from "../slices/ui"
import { toggleDrawer as tdr } from "../slices/ui"
import { setAuthenticated as setauth } from "../slices/auth"
export const setAuthenticated = (authenticated: boolean) => {
    store.dispatch(setauth(authenticated))
}

export const toggleDarkMode = () => {
    tdm()
}

export const toggleDarkModeProduction = () => {
    store.dispatch(tdm())
}


export const toggleDrawer = (val?: boolean) => {
    typeof val !== "undefined" ? store.dispatch(tdr(val)) : store.dispatch(tdr())
}

