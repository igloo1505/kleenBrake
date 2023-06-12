"use client"
import React from 'react'
import HeroContentManipulation from './contentManipulation/HeroContent';
import { connect } from 'react-redux';
import store, { RootState } from '../../state/store';
import { AppDataType } from '../../state/initial/appData';
import Button from '../io/Button';
import { resetAppData } from '../../state/actions/developmentActions';
import SetFeaturedContentSection from './contentManipulation/SetFeaturedSection';
import Link from 'next/link';
import { showToast } from '../../state/slices/ui';

const connector = connect((state: RootState, props: any) => ({
    appData: state.UI.appData,
    props: props
}))


interface SetContentSectionProps {
    appData: AppDataType
}

const SetContentSection = connector(({ appData }: SetContentSectionProps) => {

    const resetContent = () => {
        resetAppData()
        store.dispatch(showToast({
            severity: "info",
            title: "Reset",
            content: "Data was reset to placeholder content.",
            timeout: 5000,
            isOpen: true
        }))
    }

    const copyContent = () => {
        navigator.clipboard.writeText(JSON.stringify(appData));
        store.dispatch(showToast({
            severity: "success",
            title: "Copied!",
            content: "Copied in the format I need. You'll have to text it to me when everything is the way you like it.",
            timeout: 5000,
            isOpen: true
        }))
    }

    return (
        <div>
            <HeroContentManipulation appData={appData} />
            <SetFeaturedContentSection appData={appData} />
            <div className={'bg-[--surface-200] mx-[-1rem] py-6 flex flex-col justify-center items-center'}>
                <div className={'text-xl'}>The icon packages I current have installed</div>
                <div className={'flex flex-row gap-4 mt-2'}>
                    <a href="https://react-icons.github.io/react-icons/icons?name=fa">
                        <Button severity="info" label="Uno" />
                    </a>
                    <a href="https://primereact.org/icons/">
                        <Button severity="info" label="Dos" />
                    </a>
                </div>
                <div className={'text-xl mt-8'}>The visual editor for the UI library I&apos;m using</div>
                <div className={'text'}>This just sets a bunch of the variables in real time for some of the themes available with the library.</div>
                <div className={'flex flex-row gap-4 mt-2'}>
                    <a href="https://designer.primereact.org/#/">
                        <Button severity="info" label="Visual Editor" />
                    </a>
                </div>
            </div>
            <div className={'w-full flex flex-row justify-between items-end gap-4 mt-4'}>
                <div className={'flex flex-row gap-4'}>
                    <Link href="/">
                        <Button label="Home" />
                    </Link>
                    <Link href="/testing">
                        <Button label="Themes & UI" />
                    </Link>
                </div>
                <div className={'flex flex-row gap-4'}>
                    <Button severity="danger" onClick={resetContent} label="Reset to placeholder content" />
                    <Button severity="info" onClick={copyContent} label="Copy Content in the format I need" />
                </div>
            </div>
        </div>
    )
})

SetContentSection.displayName = "SetContentSection"

export default SetContentSection;
