import axios from 'axios'
import { defaultAxiosConfig } from '../types/NetworkTypes'
import store from '../store'
import { LoginUserData, NewUserData } from '../types/AuthTypes'
import { loginSuccess, logout } from '../slices/auth'
import { showToast } from '../slices/ui'


export const createNewUser = async (user: NewUserData) => {
    const res = await axios.post("/api/users/createUser", { user }, defaultAxiosConfig)
    if (res.data?.success) {
        store.dispatch(
            loginSuccess(res.data.newUser)
        )
    }
    return res.data
}


export const loginUser = async (data: LoginUserData) => {
    const res = await axios.post("/api/users/login", { user: data }, defaultAxiosConfig)
    if (res.data?.success) {
        store.dispatch(
            loginSuccess(res.data.user)
        )
    }
    if (!res.data?.success) {
        store.dispatch(
            showToast({
                severity: "error",
                content: "There was an error logging in.",
            })
        )
    }
    return res.data
}

export const logoutUser = async () => {
    console.log("logging out...")
    await axios.post("/api/users/logout", {}, defaultAxiosConfig)
    store.dispatch(
        logout()
    )
    window.location.pathname = "/"
}

