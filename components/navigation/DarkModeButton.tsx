"use client"
import React from 'react'
import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import { FaMoon, FaSun } from 'react-icons/fa'
import { toggleDarkMode, toggleDarkModeProduction } from '../../state/actions/syncActions';

const connector = connect((state: RootState, props: any) => ({
    darkMode: state.UI.darkMode,
    hasDarkMode: state.UI.hasDarkMode,
    props: props
}))


interface DarkModeButtonProps {
    darkMode: boolean
    hasDarkMode: boolean
}

const DarkModeButton = connector(({ darkMode, hasDarkMode }: DarkModeButtonProps) => {
    return (
        <>
            {hasDarkMode ? <a role="button" onClick={() => toggleDarkModeProduction()}>
                {darkMode ? <FaMoon /> : <FaSun />}
            </a> : <div></div>}
        </>
    )
})

DarkModeButton.displayName = "DarkModeButton"


export default DarkModeButton;
