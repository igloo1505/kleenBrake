import React from 'react'
import SalesByDepthChart from './charts/byDepth';
import { ParsedChartData } from '#/types/chartData';
import DashboardCardWithTitle from './DashboardCardWithTitle';



interface SalesByDepthProps {
    data: ParsedChartData['salesByDepth']
}

const SalesByDepth = (props: SalesByDepthProps) => {
    return (
        <DashboardCardWithTitle
            title="Sales By Depth"
            padding={false}
            /* className={'w-full h-full'} */
            style={{
                /* minHeight: "max(20vh, 200px)", */
            }}
        >
            <div className={'w-full max-w-full h-full max-h-full flex justify-center items-center text-center'}>
                <SalesByDepthChart data={props.data} />
            </div>
        </DashboardCardWithTitle>
    )
}


SalesByDepth.displayName = "SalesByDepth"


export default SalesByDepth;
