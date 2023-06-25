export const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]


export interface recentSalesDay {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
    totalSales: number
    totalQuantity: number
    totalProfit: number
}


export interface topSeller {
    username: string
    totalSales: number
    salesThisWeek: number
}

export interface RecentSale {
    soldBy: topSeller
    amount: number
    profit: number
    date: Date
}


export interface ParsedChartData {
    salesHistory: [
        recentSalesDay,
        recentSalesDay,
        recentSalesDay,
        recentSalesDay,
        recentSalesDay,
        recentSalesDay,
        recentSalesDay,
    ]
    topSellers: [
        topSeller,
        topSeller,
        topSeller,
        topSeller,
        topSeller,
    ]
    recentSales: RecentSale[]
}


export const parseChartData = (data: any): ParsedChartData => {
    return {
        recentSales: [],
        /// @ts-ignore
        topSellers: [],
        /// @ts-ignore
        salesHistory: []
    }
}
