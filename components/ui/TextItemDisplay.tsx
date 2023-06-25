import clsx from 'clsx'
import React from 'react'



interface TextItemDisplayProps {
    label?: string
    value: string | number
    styles?: {
        label?: React.CSSProperties
        value?: React.CSSProperties
        container?: React.CSSProperties
    }
    classNames?: {
        label?: string
        value?: string
        container?: string
    }
    noWrap?: boolean
}

const TextItemDisplay = ({ label, value, classNames, styles, noWrap }: TextItemDisplayProps) => {
    return (
        <div className={clsx('w-full flex flex-col justify-center items-start gap-2', classNames?.container && classNames.container)}
            style={
                styles?.container ? styles.container : {}
            }
        >
            {value && <div
                className={clsx('', classNames?.label && classNames.label)}
                style={
                    styles?.label ? styles.label : {}
                }
            >{label}</div>}
            <div
                className={clsx('w-full px-4 py-3 border border-[--surface-border] rounded hover:border-primary transition-all duration-300', classNames?.value && classNames.value)}
                style={
                    styles?.value ? styles.value : {
                        whiteSpace: "nowrap"
                    }
                }
            >{value}</div>
        </div>
    )
}


TextItemDisplay.displayName = "TextItemDisplay"


export default TextItemDisplay;
