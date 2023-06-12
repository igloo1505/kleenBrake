import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'
import { RemoveTagFuncType } from '../../types/contentManipulationTypes';


interface TagProps {
    value: string
    formattedValue: string
    extraClasses?: {
        link?: string
        container?: string
    }
    idx: number
    handleRemove?: RemoveTagFuncType
}

const Tag = ({ value, formattedValue, extraClasses, idx, handleRemove }: TagProps) => {
    return (
        <div className={clsx('bg-[--primary-color] text-[--primary-color-text] rounded-xl shadow-sm px-3 py-2 w-fit flex flex-row justify-center items-center gap-1', extraClasses?.container && extraClasses.container)}>
            {handleRemove && (
                <div className={'flex justify-center items-center cursor-pointer'} onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleRemove(idx, value, formattedValue)
                }}>
                    <i className={'pi pi-times'} />
                </div>
            )}
            <Link href={`/byTag/${formattedValue}`} className={clsx('w-fit', extraClasses?.link && extraClasses.link)}>{value}</Link>
        </div>
    )
}



export default Tag;
