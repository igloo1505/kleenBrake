"use client"
import { Chart } from 'primereact/chart';
import React, { useEffect, useState } from 'react'
import NoDataToDisplay from './noDataToDisplay';
import { ParsedChartData, getChartColor } from '#/types/chartData';

interface dataset {
    data: number[]
    hoverBackgroundColor: string[]
    backgroundColor: string[]
}

interface datatype {
    labels: string[]
    datasets: dataset[]
}

interface SalesDepthChartProps {
    data: ParsedChartData['salesByDepth']
}

const SalesByDepthChart = ({ data }: SalesDepthChartProps) => {
    const range = data.map((a, i) => i)
    const chartData: datatype = {
        labels: range.map((n) => `Depth: -${n + 1}`),
        datasets: [
            {
                data: data.map((a) => a.quantity),
                backgroundColor: range.map((n) => getChartColor(n, 500)),
                hoverBackgroundColor: range.map((n) => getChartColor(n, 400))
            }
        ]
    }
    const chartOptions = {
        cutout: '60%',
        plugins: {
            legend: {
                display: false
            }
        }
    }

    /* const [chartOptions, setChartOptions] = useState({}); */

    /* useEffect(() => { */
    /*     const documentStyle = getComputedStyle(document.documentElement); */
    /*     const data = { */
    /*         labels: [], */
    /*         datasets: [ */
    /*             { */
    /*                 data: [], */
    /*                 backgroundColor: [ */
    /*                     documentStyle.getPropertyValue('--blue-500'), */
    /*                     documentStyle.getPropertyValue('--yellow-500'), */
    /*                     documentStyle.getPropertyValue('--green-500') */
    /*                 ], */
    /*                 hoverBackgroundColor: [ */
    /*                     documentStyle.getPropertyValue('--blue-400'), */
    /*                     documentStyle.getPropertyValue('--yellow-400'), */
    /*                     documentStyle.getPropertyValue('--green-400') */
    /*                 ] */
    /*             } */
    /*         ] */
    /*     }; */
    /*     /* Chart.overrides[type].plugins.legend */
    /*     setChartData(data); */
    /*     setChartOptions(options); */
    /* }, []); */

    return (
        !chartData.datasets[0] || chartData.datasets?.[0]?.data?.length === 0 ? <NoDataToDisplay /> : <Chart type="doughnut" data={chartData} width="100%" options={chartOptions} className="w-full max-w-full h-auto" style={{
            maxWidth: "100% !important",
            width: "100% !important",
            height: "auto !important"
        }} />
    )
}


SalesByDepthChart.displayName = "TopSellersChart"


export default SalesByDepthChart;
