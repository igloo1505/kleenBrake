"use client"
import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import store, { RootState } from '../../state/store';
import { availableThemes } from '../../state/initial/themeTesting';
import { disableAllThemes } from '../../state/actions/developmentActions';
import { ActiveThemeType } from '../../state/types/reduxTypes';
import { setActiveTheme as setTheme1 } from '../../state/slices/testing';
import { setActiveTheme as setTheme2 } from '../../state/slices/ui';

const connector = connect((state: RootState, props: any) => ({
    activeTheme: state.development.active_theme,
    props: props
}))

interface ThemeClientSetterProps {
    activeTheme: string
}

const setActiveTheme = (data: ActiveThemeType) => {
    store.dispatch(setTheme1(data))
    store.dispatch(setTheme2(data))
}

const ThemeClientSetter = connector(({ activeTheme }: ThemeClientSetterProps) => {
    const [isInitial, setIsInitial] = useState(true)
    const getCurrentTheme = () => {
        if (typeof window !== "undefined") {
            return window.localStorage.getItem("currentTheme") || activeTheme
        }
        return activeTheme
    }
    useEffect(() => {
        let curTheme = getCurrentTheme()
        availableThemes.forEach((theme) => {
            let ids = {
                light: theme.lightId(),
                dark: theme.darkId()
            }
            if (isInitial && theme.original && curTheme === "") {
                if (theme.original === "light") {
                    setActiveTheme({ id: ids.light!, darkId: ids.dark, lightId: ids.light, variant: "light" })
                    return setIsInitial(false)
                }
                if (theme.original === "dark") {
                    setActiveTheme({
                        id: ids.dark!, darkId: ids.dark, lightId: ids.light, variant: "dark"
                    })
                    return setIsInitial(false)
                }
            }
            if (curTheme === ids.light) {
                disableAllThemes()
                if (activeTheme !== "") {
                    theme.light()
                }
                if (activeTheme === "") {
                    setActiveTheme({ id: ids.light!, darkId: ids.dark, lightId: ids.light, variant: "light" })
                }
            }
            if (curTheme === ids.dark) {
                disableAllThemes()
                if (activeTheme !== "") {
                    theme.dark()
                }
                if (activeTheme === "") {
                    setActiveTheme({ id: ids.dark!, lightId: ids.light, darkId: ids.dark, variant: "dark" })
                }
            }
        })
        if (isInitial) {
            setIsInitial(false)
        }
    }, [activeTheme])

    return null
})

ThemeClientSetter.displayName = "ThemeClientSetter"


export default ThemeClientSetter;
