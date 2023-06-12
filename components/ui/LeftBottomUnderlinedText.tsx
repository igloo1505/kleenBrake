import clsx from 'clsx'
import React from 'react'


const baseClasses = "pl-2 pb-2"

interface LeftBottomUnderlinedTextProps {
    text: string
    textClasses?: string
    underlineColor?: string
    hideBorderBottom?: boolean
    thickness?: string
}

const LeftBottomUnderlinedText = (props: LeftBottomUnderlinedTextProps) => {
    const underlineColor = props.underlineColor || "var(--primary-color)"
    const thickness = props.thickness || '4px'
    return (
        <div className={clsx(baseClasses, props.textClasses && props.textClasses)} style={{
            borderLeft: `${thickness} solid ${underlineColor}`,
            ...(!props.hideBorderBottom && { borderBottom: `${thickness} solid ${underlineColor}` })
        }}>
            {props.text}
        </div>
    )
}



export default LeftBottomUnderlinedText;
