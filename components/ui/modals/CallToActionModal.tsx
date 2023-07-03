"use client"
import React from 'react'
import ModalWrapper from './ModalWrapper';
import { Ripple } from 'primereact/ripple'
import Button from '@/io/Button';
import Link from 'next/link';


const content = {
    bps: [
        "Financial Freedom",
        "Flexibility",
        "Fun"
    ],
    body: [
        "Founded by Lucher Holloway, successful business man, commodities trader, and owner of several laundromats throughout Chicago, and Anthony Boyle, transactional law, business and network marketing attorney, KleenBreak, LLC presents a unique opportunity for entrepreneurs and businesspeople alike that love direct sales and the multi-level marketing model to find financial freedom by starting their own laundromat company.",
        "Get a KleenBreak in life.",
        "Start your own business. Own your own company.",
        "Own your future!"
    ],
    underBodyTitle: "Grow Your Business",
    underBody: [
        "Generating leads and growing your business is as simple as it is to generate income for yourself and your family by becoming a KleenBreak representative.",
        "Friends, family, friends of family and friends of friends are a great starting point.",
        "Throughout your KleenBreak journey, you will meet other businesspeople that love network marketing as much as you do, and they will be part of your team. You will be the mentor to hundreds, or even thousands of other KleenBreak representatives (the more committed you are to your business). You will have a group of clients that use the KleenBreak service, and you will generate a commission every time they use the KleenBreak laundry service.",
        "You will even generate a commission for every person that you refer to simply download our KleenBreak App. This is where you will manage your leads, clients, and contracts.",
        "Own your business! Own your future!"
    ]
}



interface CallToActionModalProps {
    open: boolean
}

const ListItem = ({ label }: { label: string }) => {
    return (
        <div className={'relative background-hover-opacity-target flex flex-row gap-0 flex-nowrap justify-center items-center px-4 py-4 text-[--text-color] rounded-lg border border-primary'}>
            {label}
            <div className={'w-full h-full top-0 left-0 absolute background-hover-opacity'} />
        </div>
    )
}

const Paragraph = ({ val }: { val: string }) => {
    return (
        <div className={'indent-4'}>{val}</div>
    )
}


const CallToActionModal = ({ open }: CallToActionModalProps) => {
    return (
        <ModalWrapper open={open} title="A KleenBreak in Life" styles={{
            container: {
                width: "90vw",
            }
        }}>
            <div className={'bg-[--surface-card] px-4 py-4'}>
                <div className={'w-full grid grid-cols-1 md:grid-cols-3 gap-2'}>
                    {content.bps.map((b, i) => {
                        return (
                            <ListItem label={b} key={`bullet-item-${i}`} />
                        )
                    })}
                </div>
                <div className={'py-4 flex flex-col justify-start items-start gap-2 px-4'}>
                    {content.body.map((v, i) => <Paragraph val={v} key={`paragraph-${i}`} />)}
                </div>
                <div className={'w-full flex flex-col justify-center items-center gap-4'}>
                    <Link href="/signup">
                        <Button label="ENROLL NOW" size='large' />
                    </Link>
                    <div>Click to view KleenBreak Representative Income at all levels</div>
                </div>
                <div className={'w-full text-2xl font-semibold text-center my-6 underline underline-offset-8 decoration-primary'}>{content.underBodyTitle}</div>
                <div className={'w-full flex flex-col justify-start items-start gap-4'}>
                    {content.underBody.map((b, i) => <Paragraph val={b} key={`underbody-paragraph-${i}`} />)}
                </div>
                <div className={'w-full flex justify-center items-center my-6'}>
                    <div className={'w-fit gap-4 grid grid-cols-2'}>
                        <Link href="/paymentModel">
                            <Button label="Payment Model" className='w-full h-full' />
                        </Link>
                        <Link href="/signup">
                            <Button label="Sign Up" className='w-full h-full' />
                        </Link>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    )
}


CallToActionModal.displayName = "CallToActionModal"


export default CallToActionModal;
