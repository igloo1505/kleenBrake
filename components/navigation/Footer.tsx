"use client"
import React from 'react'
import FooterColumn, { FooterColumnProps } from './FooterColumn';
import FooterSocialMedia from './FooterSocialMediaCol';
import { AppDataType } from '../../state/initial/appData';
import { connect } from 'react-redux';
import { RootState } from '../../state/store';

const connector = connect((state: RootState, props: any) => ({
    socials: state.UI.appData.socials,
    props: props
}))


const columns: FooterColumnProps[] = [
    {
        title: "About Us",
        colNumber: 1,
        links: [
            {
                url: "/aboutUs",
                label: "About Us"
            },
            {
                url: "/sellerBenefits",
                label: "Seller Benefits"
            },
            {
                url: "/faq",
                label: "FAQ"
            },
        ]
    },
    {
        title: "Information",
        colNumber: 2,
        links: [
            {
                url: "/inThePress",
                label: "In the press"
            },
            {
                url: "/support",
                label: "Support"
            },
        ]
    },
    {
        title: "Legal",
        colNumber: 3,
        links: [
            {
                url: "/termsOfUse",
                label: "Terms of use"
            },
            {
                url: "/privacy",
                label: "Privacy"
            },
        ]
    },
]


const Footer = connector(({ socials }: { socials: AppDataType['socials'] }) => {
    return (
        <div className={'px-4 py-6 mx-0 mb-0 mt-8 w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-items-start gap-2 bg-[--highlight-bg] text-[--highlight-text-color] [gridRowGap:1.5rem]'}>
            {columns.map((c, i) => <FooterColumn {...c} key={`footer-column-${i}`} />)}
            <FooterSocialMedia socials={socials} />
        </div>
    )
})

Footer.displayName = "Footer"


export default Footer;
