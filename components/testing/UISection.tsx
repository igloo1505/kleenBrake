import React from 'react'
import ButtonDemoSection from './ButtonDemoSection'



type severType = "secondary" | "success" | "info" | "warning" | "help" | "danger"

export const severities: severType[] = [
    "secondary",
    "success",
    "info",
    "warning",
    "help",
    "danger"
]

const SectionTitle = ({ title }: { title: string }) => {
    return (
        <div className={'w-full text-4xl'}>{title}</div>
    )
}

const colors: {
    var: string
    label?: string
}[] = [
        {
            var: "--primary-color",
            label: "Primary Color"
        },
        {
            var: "--primary-color-text",
            label: "Primary Color Text"
        },
        {
            var: "--text-color-secondary"
        },
        {
            var: "--surface-a"
        },
        {
            var: "--surface-b"
        },
        {
            var: "--surface-c"
        },
        {
            var: "--surface-d"
        },
        {
            var: "--surface-e"
        },
        {
            var: "--surface-f"
        },
        {
            var: "--surface-50"
        },
        {
            var: "--surface-100"
        },
        {
            var: "--surface-200"
        },
        {
            var: "--surface-300"
        },
        {
            var: "--surface-400"
        },
        {
            var: "--surface-500"
        },
        {
            var: "--surface-600"
        },
        {
            var: "--surface-700"
        },
        {
            var: "--surface-800"
        },
        {
            var: "--gray-50"
        },
        {
            var: "--gray-100"
        },
        {
            var: "--gray-200"
        },
        {
            var: "--gray-300"
        },
        {
            var: "--gray-400"
        },
        {
            var: "--gray-500"
        },
        {
            var: "--gray-600"
        },
        {
            var: "--gray-700"
        },
        {
            var: "--gray-800"
        },
        {
            var: "--gray-900"
        },

        {
            var: "--surface-ground"
        },

        {
            var: "--surface-section"
        },
        {
            var: "--surface-card"
        },
        {
            var: "--surface-overlay"
        },
        {
            var: "--surface-border"
        },
        {
            var: "--surface-hover"
        },
        {
            var: "--highlight-bg"
        },
        {
            var: "--surface-text-color"
        },
        {
            var: "--maskbg"
        },
    ]


export const SectionSubTitle = ({ title }: { title: string }) => {
    return (
        <div className={'w-full text-2xl my-2 pl-4'}>{title}</div>
    )
}

const ColorItem = ({ color }: { color: { var: string, label?: string } }) => {
    return (
        <div className={'w-[300px] max-w-contenetCol flex flex-row justify-between items-center gap-4'}>
            <div className={'w-[3rem] h-[3rem]'} style={{
                backgroundColor: `var(${color.var})`
            }}></div>
            <div>{color.label || color.var}</div>
        </div>
    )
}

const DemoUISection = () => {
    return (
        <div>
            <SectionTitle title={"Buttons"} />
            <ButtonDemoSection sectionLabel="Colors" extraWrapperClasses="mt-4" />
            <ButtonDemoSection sectionLabel="Raised" extraProps={{ raised: true }} extraWrapperClasses="mt-4" />
            <ButtonDemoSection sectionLabel="Rounded" extraProps={{ rounded: true }} extraWrapperClasses="mt-4" />
            <ButtonDemoSection sectionLabel="Text Only" extraProps={{ text: true }} extraWrapperClasses="mt-4" />
            <ButtonDemoSection sectionLabel="Outlined" extraProps={{ outlined: true }} extraWrapperClasses="mt-4" />
            <ButtonDemoSection sectionLabel="Small" extraProps={{ size: "small" }} extraWrapperClasses="mt-4" />
            <ButtonDemoSection sectionLabel="Large" extraProps={{ size: "large" }} extraWrapperClasses="mt-4" />
            <div className={'w-full flex flex-col justify-center items-center mt-6'}>
                <div className={'text-2xl my-4'}>Colors</div>
                <div className={'w-full flex flex-col justify-center items-center gap-6'}>
                    {colors.map((c, i) => <ColorItem color={c} key={`color-item-${i}`} />)}
                </div>
            </div>
        </div>
    )
}



export default DemoUISection;
