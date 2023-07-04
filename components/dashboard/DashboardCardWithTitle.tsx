import clsx from 'clsx'
import React from 'react'



interface DashboardCardWithTitleProps {
    title: string
    children: React.ReactNode
    style?: React.CSSProperties
    padding?: boolean
    className?: string
    paddingTitle?: {
        top: string
        bottom: string
    }
}

const DashboardCardWithTitle = ({ title, paddingTitle = {
    top: "0.75rem",
    bottom: "0.5rem"
}, className, padding = true, style, children }: DashboardCardWithTitleProps) => {
    return (
        <div className={clsx('grid grid-rows-[auto_1fr] bg-[--surface-card] border border-[--surface-border] rounded-xl relative max-w-full max-h-full', className && className)}
            style={style ? style : {}}
        >
            <div className={'text-xl font-semibold text-center tracking-wide px-4'}
                style={{
                    paddingTop: paddingTitle.top,
                    paddingBottom: paddingTitle.bottom
                }}
            >{title}</div>
            {padding ? (
                <div className={'px-4 py-4'}>
                    {children}
                </div>
            )
                : <>
                    {children}
                </>
            }
        </div>
    )
}


DashboardCardWithTitle.displayName = "DashboardCardWithTitle"


export default DashboardCardWithTitle;
