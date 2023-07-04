"use client"
import { Chart } from 'primereact/chart';
import React, { useState } from 'react'
import { useDashboardStyles } from '#/state/hooks/UIHooks';
import { ParsedChartData, getChartColor } from '#/types/chartData';
import store from '#/state/store';


interface dataset {
    label: string
    data: number[]
    tension: number
    fill: boolean
    borderColor: string
    backgroundColor?: string
}

interface Props {
    data: ParsedChartData['salesHistory']
    previousWeek: ParsedChartData['previousWeek']['salesByDay']
}

const SalesHistoryChart = ({ data, previousWeek }: Props) => {
    const labels = data.map((d) => d.day).reverse()
    const prevLabels = data.map((d) => d.day).reverse()
    console.log("labels, prevLabels: ", labels, prevLabels)
    const [darkMode, setDarkMode] = useState<boolean>(false)
    const watchDarkMode = () => {
        const _darkMode = store.getState().UI.darkMode
        console.log("_darkMode: ", _darkMode)
        _darkMode !== darkMode && setDarkMode(_darkMode)
    }
    store.subscribe(watchDarkMode)
    const thisWeekProfit: dataset = {
        label: "Profit",
        fill: false,
        tension: 0.4,
        borderColor: getChartColor(0, 500, darkMode),
        data: data.map((d) => d.totalProfit / 100).reverse()
    }
    const thisWeekQuantity: dataset = {
        label: "Sales",
        fill: false,
        tension: 0.4,
        borderColor: getChartColor(1, 500, darkMode),
        data: data.map((d) => d.totalQuantity).reverse()
    }


    const lastWeekProfit: dataset = {
        label: "Last Week's Profit",
        tension: 0.4,
        fill: true,
        borderColor: getChartColor(2, 500, darkMode),
        backgroundColor: `${getChartColor(2, 300, darkMode)}22`,
        data: previousWeek.map((d) => d.totalProfit / 100).reverse()
    }
    const lastWeekQuantity: dataset = {
        label: "Last Week's Sales",
        fill: true,
        tension: 0.4,
        borderColor: getChartColor(3, 500, darkMode),
        backgroundColor: `${getChartColor(3, 300, darkMode)}22`,
        data: previousWeek.map((d) => d.totalQuantity).reverse()
    }

    const chartData = {
        labels: labels,
        datasets: [
            thisWeekProfit,
            thisWeekQuantity,
            lastWeekProfit,
            lastWeekQuantity
        ]
    }


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        /* aspectRatio: 1.6, */
        plugins: {
            legend: {
                labels: {
                    color: getChartColor(-1, 500, darkMode)
                }
            }
        },
        scales: {
            /* responsive: true, */
            x: {
                /* stacked: true, */
                ticks: {
                    color: getChartColor(-2, 500, darkMode)
                },
                grid: {
                    color: getChartColor(-3, 500, darkMode)
                }
            },
            y: {
                /* stacked: true, */
                ticks: {
                    color: getChartColor(-2, 500, darkMode)
                },
                grid: {
                    color: getChartColor(-3, 500, darkMode)
                }
            }
        }

    };

    if (!chartData) {
        return null
    }

    return (<Chart type="line" data={chartData} options={options}
        className="max-w-full lg:w-[calc(100%-1rem)]" style={{
            maxWidth: "100% !important",
            width: "calc(100% - 1rem)",
            height: "100%",
            paddingBottom: "1rem",
            paddingTop: "1rem",
            /* marginLeft: "0.5rem", */
            /* height: "auto !important" */
        }} />

    )
}


SalesHistoryChart.displayName = "SalesHistoryChart"


export default SalesHistoryChart;
