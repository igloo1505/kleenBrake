"use client"
import React, { useState, useEffect, MouseEventHandler } from 'react'
import { ToggleButtonChangeEvent } from 'primereact/togglebutton';
import styles from '../../styles/testing.module.css'
import ToggleButton from '../../components/ui/ToggleButton'
import { setAuthenticated, toggleDarkMode } from '../../state/actions/syncActions';
import { availableThemes } from '../../state/initial/themeTesting';
import Button from '../io/Button';
import { setActiveTheme } from '../../state/slices/ui';
import store from '../../state/store';


interface StateToggleSectionProps {
    darkMode: boolean
    authenticated: boolean
    activeTheme: string
}



type TestBooleanItemProps = {
    label: string,
    onLabel: string,
    offLabel: string,
    disabled: boolean
    onClick: MouseEventHandler,
    on: boolean
}

const TestBooleanItem = (props: TestBooleanItemProps) => {
    return (
        <div className={styles.buttonContentContainer}>
            <div className={styles.buttonContainerText}>{props.label}</div>
            <div className={styles.buttonContainerBtn}>
                <Button label={props.on ? props.onLabel : props.offLabel} onClick={props.onClick} disabled={props.disabled || false} />
            </div>
        </div>
    )
}


const StateToggleSection = ({ authenticated, darkMode, activeTheme }: StateToggleSectionProps) => {
    const [allowDarkToggle, setAllowDarkToggle] = useState(false)

    const getCurrentTheme = () => {
        const curTheme = availableThemes.filter((t) => Boolean(activeTheme === t.lightId() || activeTheme === t.darkId()))
        if (!curTheme || curTheme.length === 0) return false;
        return curTheme[0]
    }

    useEffect(() => {
        const cur = getCurrentTheme()
        if (!cur) {
            return setAllowDarkToggle(false)
        }
        setAllowDarkToggle(cur.hasDarkTheme)
    }, [activeTheme])

    const toggleDarkMode = () => {
        let cur = getCurrentTheme()
        if (!cur) return;
        if (activeTheme === cur.lightId()) {
            let lid = cur.lightId()
            if (lid) {
                cur.deactivate(lid)
            }
            cur.dark()
            store.dispatch(setActiveTheme({ id: cur.darkId()!, darkId: cur.darkId(), lightId: cur.lightId(), variant: "dark" }))
        }
        if (activeTheme === cur.darkId()) {
            let did = cur.darkId()
            if (did) {
                cur.deactivate(did)
            }
            cur.light()
            store.dispatch(setActiveTheme({ id: cur.lightId()!, darkId: cur.darkId(), lightId: cur.lightId(), variant: "light" }))
        }
    }
    return (
        <div className={'w-full'}>
            <div className={'flex flex-col justify-center items-center w-full'}>
                <div className={styles.testingTitle}>
                    Testing utilities
                </div>
                <div className={styles.testingSubtitle}>
                    This is just for easily and quickly switching states while in development. <br /> This won&apos;t make it into the public app. <br /> All of these are working under the hood, but not all of them are implemented yet.
                </div>
            </div>
            <div className={'grid'} style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))"
            }}>
                <TestBooleanItem label={"Toggle User's logged in status:"}
                    onLabel="Authenticated"
                    offLabel="Un-Authenticated"
                    disabled={false}
                    on={authenticated}
                    onClick={() => setAuthenticated(!authenticated)}
                />
                <TestBooleanItem
                    label={"Dark Mode"}
                    onLabel={"Dark Mode"}
                    offLabel={"Light Mode"}
                    disabled={!allowDarkToggle}
                    on={darkMode}
                    onClick={toggleDarkMode}
                />
            </div>
        </div>
    )
}



export default StateToggleSection;
