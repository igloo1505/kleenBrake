"use client"
import { Chart } from 'primereact/chart';
import React from 'react'
import { useDashboardStyles } from '#/state/hooks/UIHooks';


const SalesHistoryChart = () => {
    const styles = useDashboardStyles()
    if (!styles) return null

    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                tension: 0.4,
                borderColor: styles.colors[0]
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderDash: [5, 5],
                tension: 0.4,
                borderColor: styles.colors[1]
            },
            {
                label: 'Third Dataset',
                data: [12, 51, 62, 33, 21, 62, 45],
                fill: true,
                borderColor: styles.colors[2],
                tension: 0.4,
                backgroundColor: 'rgba(255,167,38,0.2)'
            }
        ]
    }


    const options = {
        maintainAspectRatio: false,
        /* aspectRatio: 0.6, */
        plugins: {
            legend: {
                labels: {
                    color: styles.textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: styles.textColorSecondary
                },
                grid: {
                    color: styles.surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: styles.textColorSecondary
                },
                grid: {
                    color: styles.surfaceBorder
                }
            }
        }
    };

    if (!chartData) {
        return null
    }

    return (styles ?
        <Chart type="line" data={chartData} options={options} className="w-full max-w-full h-full" style={{
        }} /> : null
    )
}


SalesHistoryChart.displayName = "SalesHistoryChart"


export default SalesHistoryChart;
