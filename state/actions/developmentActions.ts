import appData, { AppDataType } from "../initial/appData"
import { availableThemes } from "../initial/themeTesting"
import { setChangeModalActive } from "../slices/testing"
import { setUIAppData } from "../slices/ui"
import store from "../store"


export const disableAllThemes = () => {
    availableThemes.forEach((t) => {
        t.deactivateSelf()
        t.deactivateSelf()
    })
}


export const getAppData = () => {
    if (typeof window === "undefined") {
        return appData
    }
    let state = store?.getState()
    if (state?.UI?.appData) {
        return state.UI.appData
    }
    return appData
}

export const setOriginalAppData = () => {
    if (typeof window === "undefined") return;
    let data = window.localStorage.getItem("UIAppData")
    if (data) {
        store.dispatch(
            setUIAppData(JSON.parse(data))
        )
    }
}


export const handleAppDataChange = (value: AppDataType) => {
    // if (typeof window === "undefined") return;
    if (window) {
        window.localStorage.setItem("UIAppData", JSON.stringify(value))
    }
    store.dispatch(
        setUIAppData(value)
    )
}


export const resetAppData = () => {
    store.dispatch(
        handleAppDataChange(appData as AppDataType)
    )
}


export const showContentManipulationModal = () => {
    let em = document.getElementById("content-manipulation-modal")
    if (!em) return;
    em.style.transform = "translate(-50%, -50%)"
    em.style.opacity = "1"
}

export const hideContentManipulationModal = () => {
    let em = document.getElementById("content-manipulation-modal")
    if (!em) return;
    em.style.transform = "translate(-50%, -100vh)"
    em.style.opacity = "0"
    store.dispatch(setChangeModalActive({
        label: "",
        value: "",
        isOpen: false,
        name: ""
    }))
}
