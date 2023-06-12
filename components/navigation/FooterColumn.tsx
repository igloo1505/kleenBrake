import Link from 'next/link'
import React from 'react'
import FooterColTitle from './FooterColTitle'


export interface LinkFooterType {
    url: string
    label: string
}

export interface FooterColumnProps {
    title: string
    links: LinkFooterType[]
    colNumber: number
}

const FooterColumn = (props: FooterColumnProps) => {
    return (
        <div className={'w-full h-full flex flex-col justify-start items-center'}>
            <FooterColTitle title={props.title} />
            {props.links.map((l, i) => {
                return <Link href={l.url} key={`column-${props.colNumber}-${i}`}>{l.label}</Link>
            })}
        </div>
    )
}



export default FooterColumn;
