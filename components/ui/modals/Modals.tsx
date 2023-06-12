"use client"
import React from 'react'
import { connect } from 'react-redux';
import { RootState } from '../../../state/store';
import TermsOfService from './TermsOfService';
import PrivacyModal from './Privacy';

const connector = connect((state: RootState, props: any) => ({
    modals: state.UI.modals,
    props: props
}))


interface ModalsProps {
    modals: RootState['UI']['modals']
}


const Modals = connector(({ modals }: ModalsProps) => {
    return (
        <>
            <TermsOfService open={modals.termsOfService} />
            <PrivacyModal open={modals.privacy} />
        </>
    )
})


Modals.displayName = "Modals"


export default Modals;
