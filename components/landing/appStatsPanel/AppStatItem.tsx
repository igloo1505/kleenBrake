import React from 'react'
import { AppStatItemType } from '../../../types/UITypes';
import { FaUsers, FaDollarSign, FaImages, FaCommentDots } from 'react-icons/fa'
import { numberToDisplayString } from '../../../utils/formatting';
import { formatDollars } from '../../../utils/formatting';

const valParseMap = {
    number: numberToDisplayString,
    dollar: formatDollars
}

interface AppStatItemProps {
    item: AppStatItemType
    idx: number
}

const Icons = [
    FaUsers,
    FaDollarSign,
    FaImages,
    FaCommentDots
]

const IconMap = ({ idx, className }: { idx: number, className: string }) => {
    const Icon = Icons[idx]
    return <Icon className={className} />
}

const AppStatItem = ({ item, idx }: AppStatItemProps) => {
    const parseValue = () => {
        if (!item.formatValue) {
            return item.value
        }
        return valParseMap[item.formatValue](item.value)
    }
    return (
        <div className={'w-full px-3 py-4 grid app-stat-item-grid gap-3 text-[highlight-text-color] bg-[--surface-card] select-none cursor-default xs:min-w-[265px] shadow-lg hover:shadow-md transition-shadow duration-300'} style={{
            border: '1px solid var(--surface-border)'
        }}>
            <div className={'h-full w-full flex justify-center items-center xs:min-w-[3rem] select-none'}>
                <IconMap idx={idx} className={'h-full w-auto text-[--text-color]'} />
            </div>
            <div className={'flex flex-col justify-between items-start text-[--text-color]'}>
                <div className={'text-3xl lg:text-4xl select-none'}>
                    {parseValue()}
                </div>
                <div className={'text-xl lg:text-1xl select-none'}>
                    {item.label}
                </div>
            </div>
        </div>
    )
}



export default AppStatItem;
