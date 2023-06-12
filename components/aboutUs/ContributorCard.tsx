import type { ContributorType } from '#/types/UITypes';
import Button from '@/io/Button';
import Image from 'next/image';
import React from 'react'


const ContributorCard = ({
    member
}: {
    member: ContributorType
}) => {
    return (
        <div className={'w-full px-4 py-6 rounded bg-[--surface-card] grid grid-cols-[25%_75%] max-w-contenetCol shadow-md hover:shadow-sm transition duration-300'} style={{
            border: "1px solid var(--surface-border)"
        }}>
            {member.imagePath &&
                (
                    <Image src={member.imagePath} width={1080} height={1080} alt="Team Member Image" className={'inline-block w-full rounded'}
                    />
                )
            }
            <div className={'inline-flex flex-col w-fit h-fit gap-0 max-w-full px-4'}>
                <div className={'text-[--primary-color] text-lg md:text-xl lg:text-2xl'}>
                    {member.title}
                </div>
                <div className={'text-[--highlight-text-color] md:text-lg lg:text-xl pl-2 font-bold'}>
                    {member.position}
                </div>
                <div className={'mt-2'}>
                    {member.body}
                </div>
            </div>
        </div>
    )
}


ContributorCard.displayName = "ContributorCard"


export default ContributorCard;
