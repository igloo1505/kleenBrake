import { RecentSale } from '#/types/chartData'
import { formatCurrencyString } from '#/utils/formatting'
import React from 'react'
import DashboardDetailBadge from './DashboardListItemDetailBadge'



interface RecentSaleListItemProps {
    item: RecentSale
}

const RecentSaleListItem = ({ item }: RecentSaleListItemProps) => {
    return (
        <div className={'w-full h-full rounded-lg bg-[--surface-section] text-[--text-color] px-4 py-4 border border-[--surface-border] grid grid-cols-[auto_1fr] gap-4'}>
            <div className={'flex flex-col justify-start items-start gap-1'}>
                <div>{item.soldBy.username}</div>
                <div className={'text-[--text-color-secondary] text-sm'}>Total Sales: {item.soldBy.salesQuantity}</div>
                <div className={'text-[--text-color-secondary] text-sm'}>Total Revenue: {formatCurrencyString(item.soldBy.salesTotal)}</div>
            </div>
            <div className={'w-full grid grid-cols-2 gap-4'}>
                <DashboardDetailBadge label="Revenue" val={formatCurrencyString(item.amount)} numerical={item.amount} color="success" />
                <DashboardDetailBadge label="Profit" val={formatCurrencyString(item.profit)} numerical={item.profit} color="success" />
            </div>
        </div>
    )
}


RecentSaleListItem.displayName = "RecentSaleListItem"


export default RecentSaleListItem;
