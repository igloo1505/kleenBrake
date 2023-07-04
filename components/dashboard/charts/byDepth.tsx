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
        responsive: true,
        cutout: '60%',
        plugins: {
            legend: {
                display: false
            }
        }
    }


    return (
        !chartData.datasets[0] || chartData.datasets?.[0]?.data?.length === 0 ? <NoDataToDisplay /> : <Chart type="doughnut" data={chartData} options={chartOptions} className="max-w-full h-auto lg:w-[calc(100%-1rem)]" style={{
            maxWidth: "100% !important",
            /* width: "calc(100% - 1rem)", */
            paddingBottom: "1rem",
            paddingTop: "1rem",
            /* marginLeft: "0.5rem", */
            height: "auto !important"
        }} />
    )
}


SalesByDepthChart.displayName = "TopSellersChart"


export default SalesByDepthChart;
