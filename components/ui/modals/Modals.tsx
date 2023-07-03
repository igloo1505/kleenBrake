"use client"
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import store, { RootState } from '#/state/store';
import TermsOfService from './TermsOfService';
import PrivacyModal from './Privacy';
import CallToActionModal from './CallToActionModal';
import { openInitialModals } from '#/state/slices/ui';
import "#/styles/modals.scss"

const connector = connect((state: RootState, props: any) => ({
    modals: state.UI.modals,
    authenticated: state.auth.authenticated,
    props: props
}))


interface ModalsProps {
    modals: RootState['UI']['modals']
    authenticated: boolean
}


const Modals = connector(({ modals, authenticated }: ModalsProps) => {
    useEffect(() => {
        if (typeof window === "undefined" || authenticated) return;
        const hasOpened = window.localStorage.getItem("initialModalsOpened")
        if (hasOpened === "true") return;
        setTimeout(() => {
            store.dispatch(openInitialModals())
            window.localStorage.setItem("initialModalsOpened", "true")
        }, 1000)
    }, [])
    return (
        <>
            <TermsOfService open={modals.termsOfService} />
            <PrivacyModal open={modals.privacy} />
            <CallToActionModal open={modals.callToAction || false} />
        </>
    )
})


Modals.displayName = "Modals"


export default Modals;
