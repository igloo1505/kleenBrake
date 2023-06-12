"use client"
import React from 'react'
import { Card } from 'primereact/card';



interface CardProps {
    title?: string,
    children: React.ReactNode,
    className?: string,
    additionalParams?: object
    extraClasses?: string
    extraStyles?: object
}

const GenericCard = (props: CardProps) => {
    let params: { className?: string } = {}
    props.additionalParams && (params = { ...props.additionalParams })
    params['className'] = props.className || `w-fit flex flex-col ${props.extraClasses || ""}`
    return (
        <Card {...params} style={{
            ...(props.extraStyles && { ...props.extraStyles })
        }}>{props.children}</Card>
    )
}



export default GenericCard;
