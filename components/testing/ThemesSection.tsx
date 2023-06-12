"use client"
import React, { MouseEventHandler, useState, useEffect } from 'react'
import { ThemeType, availableThemes } from '../../state/initial/themeTesting';
import { Card } from 'primereact/card';
import Button from '../io/Button';
import store, { RootState } from '../../state/store';
import { connect } from 'react-redux';
import { setActiveTheme } from '../../state/slices/ui';
import { setActiveTheme as setActiveThemeDev } from '../../state/slices/testing';
import { ActiveThemeType } from '../../state/types/reduxTypes';

const connector = connect((state: RootState, props: any) => ({
    active_theme: state.development.active_theme,
    props: props
}))


const setActiveThemeInternal = (data: ActiveThemeType) => {
    store.dispatch(setActiveTheme(data))
    store.dispatch(setActiveThemeDev(data))
}


interface ThemeSectionProps {

}

const ActiveButton = ({ label }: { label: string }) => {
    return <Button label={label} disabled outlined raised />
}

const InactiveButton = ({ label, onClick }: { label: string, onClick: MouseEventHandler }) => {
    return <Button label={label} onClick={onClick} />
}

const ThemeItem = connector(({ theme, active_theme }: { theme: ThemeType, active_theme: string }) => {
    const [isInitial, setIsInitial] = useState(true)
    const ids = {
        light: theme.lightId(),
        dark: theme.darkId()
    }
    useEffect(() => {
        let curTheme = active_theme
        if (isInitial && theme.original) {
            if (theme.original === "light") {
                setActiveThemeInternal({ id: ids.light!, lightId: ids.light, darkId: ids.dark, variant: "light" })
            }
            if (theme.original === "dark") {
                setActiveThemeInternal({ id: ids.dark!, darkId: ids.dark, lightId: ids.light, variant: "dark" })
            }
        }
        if (!isInitial) {
            if (curTheme === ids.light) {
                theme.light()
            }
            if (curTheme === ids.dark) {
                theme.dark()
            }
        }
        if (isInitial) {
            setIsInitial(false)
        }
    }, [active_theme])

    const setLight = () => {
        theme.deactivate(active_theme)
        setActiveThemeInternal({ id: ids.light!, lightId: ids.light, darkId: ids.dark, variant: "light" })
    }
    const setDark = () => {
        theme.deactivate(active_theme)
        setActiveThemeInternal({ id: ids.dark!, lightId: ids.light, darkId: ids.dark, variant: "dark" })
    }

    return (
        <Card className={'flex flex-col justify-start items-start w-full testing-theme-card'} title={theme.label}>
            <div className={'w-full flex flex-row justify-end items-end gap-4'}>
                {ids.light === active_theme ? <ActiveButton label={theme.hasDarkTheme ? "Light" : "Toggle"} /> : <InactiveButton onClick={setLight} label={theme.hasDarkTheme ? "Light" : "Toggle"} />}
                {theme.hasDarkTheme && (ids.dark === active_theme ? <ActiveButton label="Dark" /> : <InactiveButton onClick={setDark} label="Dark" />)}
            </div>
        </Card>
    )
})

ThemeItem.displayName = "ThemeItem"

const ThemeSection = (props: ThemeSectionProps) => {
    return (
        <div className={'w-full'}>
            <div className={'grid gap-2'} style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
            }}>
                {availableThemes.map((t, i) => {
                    return <ThemeItem theme={t} key={`theme-item-${i}`} />
                })}
            </div>
        </div>
    )
}


ThemeSection.dispalyName = "ThemeSection"


export default ThemeSection;
