import type { ContributorType } from '#/types/UITypes';
import Image from 'next/image';
import React from 'react'


const ContributorCard = ({
    member
}: {
    member: ContributorType
}) => {
    return (
        <div className={'w-full px-8 py-6 rounded bg-[--surface-ground] grid grid-cols-[25%_75%] max-w-contenetCol'}>
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
