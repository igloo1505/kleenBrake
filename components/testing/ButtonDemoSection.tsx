import React from 'react'
import { SectionSubTitle, severities } from './UISection'
import Button from '../io/Button'
import clsx from 'clsx'


interface ButtonDemoSectionProps {
    extraProps?: object
    sectionLabel: string
    buttonLabelPrefix?: string
    extraWrapperClasses?: string
}

const ButtonDemoSection = (props: ButtonDemoSectionProps) => {
    return (
        <div className={clsx(props.extraWrapperClasses && props.extraWrapperClasses)}>
            <SectionSubTitle title={props.sectionLabel} />
            <div className={'flex flex-row gap-2 flex-wrap'}>
                <Button label="Primary" />
                {severities.map((s) => {
                    return <Button severity={s} label={`${props.buttonLabelPrefix ? props.buttonLabelPrefix : ""} ${s.slice(0, 1).toUpperCase()}${s.slice(1, s.length)}`} key={`button-demo-${s}`} {...props.extraProps} />
                })}
            </div>
        </div>
    )
}



export default ButtonDemoSection;
