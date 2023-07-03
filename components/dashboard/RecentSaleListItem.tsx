import { RecentSale } from '#/types/chartData'
import React from 'react'



interface RecentSaleListItemProps {
    item: RecentSale
}

const RecentSaleListItem = ({ item }: RecentSaleListItemProps) => {
    return (
        <div className={'w-full h-full flex flex-row border border-primary rounded-lg'}>
            <div>{item.soldBy.username}</div>
        </div>
    )
}


RecentSaleListItem.displayName = "RecentSaleListItem"


export default RecentSaleListItem;
