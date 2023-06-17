import store from "../store"
import { toggleDarkMode as tdm } from "../slices/ui"
import { toggleDrawer as tdr } from "../slices/ui"
import { setAuthenticated as setauth } from "../slices/auth"
import { DashboardComponent } from "#/types/UITypes"
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

export const handleDashboardComponent = (active: DashboardComponent, previous: DashboardComponent) => {
    if (typeof window === "undefined") return;
    let activeEm = document.getElementById(`dashboard-${active}`)
    let prevEm = document.getElementById(`dashboard-${previous}`)
    if (!activeEm || !prevEm) return
}
