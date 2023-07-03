import { dayOfWeekInterface, getPreviousWeek } from "#/db/dayjs"
import { DashboardWithAll, UserWithAll, childrenDataType } from "#/state/types/AuthTypes"
import { getChildrenData } from "#/utils/serverUtils"
import { Transaction, User } from "@prisma/client"

export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"


export interface recentSalesDay {
    day: DayOfWeek
    totalSales: number
    totalQuantity: number
    totalProfit: number
    transactions: Transaction[]
}


export const days: DayOfWeek[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]


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

export interface SalesByDepth {
    depth: number
    total: number
    quantity: number
}

export interface ParsedChartData {
    previousWeek: {
        salesTotal: number
        salesQuantity: number
        profit: number
        descendants: number
    }
    salesByDepth: SalesByDepth[],
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
    totalDescendants: number
    recentSales: RecentSale[]
}

const getSalesDay = (d: dayOfWeekInterface, transactions: Transaction[]): recentSalesDay => {
    let filtered = transactions.filter((t) => {
        let tDate = new Date(t.date).valueOf() / 1000
        return tDate >= d.start.unix && tDate <= d.end?.unix
    })
    // BUG: Need to fix this totalProfit figure once the pricing is figured out.
    let prices = filtered.map((t) => t.price)
    let totalPrice = prices.length > 0 ? prices.reduce((a, b) => a + b) : 0
    const totalProfit = totalPrice
    return {
        day: d.label,
        totalSales: totalPrice,
        transactions: filtered,
        totalQuantity: filtered.length,
        totalProfit: totalProfit
    }
}

type UserWithDepth = (User & { depth: number, children: User[] })
type UserWithChildIds = (User & { children: { id: number }[] })
type UserWithChildrenAndTransactions = (User & {
    children: (User & {
        dashboard: DashboardWithAll
    })[]
})

const groupByDepth = (data: UserWithAll, children: childrenDataType) => {
    const _byDepth: childrenDataType[] = []
    const getChildren = (users: UserWithChildrenAndTransactions[] | UserWithAll[] | childrenDataType, child: childrenDataType): childrenDataType[] => {
        let _depthLevel: childrenDataType = []
        users.forEach((user) => {
            const _children = child.filter((c) => {
                return user.children.map((u) => u.id).indexOf(c.id) > -1
            })
            _depthLevel = [..._depthLevel, ..._children]
        })
        if (_depthLevel.length !== 0) {
            _byDepth.push(_depthLevel)
            return getChildren(_byDepth[_byDepth.length - 1], child)
        }
        return _byDepth
    }
    return getChildren([data], children)
}


const getSalesByDepth = (user: UserWithAll, children: childrenDataType): ParsedChartData['salesByDepth'] => {
    // console.log("children: ", children)
    const reversed = children.reverse()
    const depthData: SalesByDepth[] = []
    const byDepth = groupByDepth(user, reversed)
    const gatherDepth = (user: UserWithChildrenAndTransactions, depth: number = 1) => {
        return
    }
    // byDepth.children.forEach((u) => {


    // })
    // console.log("byDepth: ", byDepth)
    // console.log("byDepth: ", byDepth)
    // const _children: SalesByDepth[] = []
    // reversed.forEach((c, i, a) => {
    //     console.log("c.createdAt: ", c.createdAt)
    // })
    // const getChildren = (user: (User & { children: { id: number }[] })) => {
    //     const _children = []
    //     // const _children = children.forEach((c) => )
    //     return _children
    // }
    return []
}

const getPreviousWeekData = (data: UserWithAll, children: childrenDataType): ParsedChartData['previousWeek'] => {
    const week = getPreviousWeek(1)
    const transactions = data.dashboard.transactions.filter((t) => {
        const tDate = new Date(t.date).valueOf() / 1000
        return tDate >= week[week.length - 1].start.unix && tDate <= week[0].end.unix
    })

    const getSalesTotal = () => transactions.length > 0 ? transactions.map((t) => t.price).reduce((a, b) => a + b) : 0

    // BUG: Handle this profit thing here too...
    const salesTotal = getSalesTotal()
    const lineFiltered = children.filter((c) => {
        const cDate = new Date(c.createdAt).valueOf() / 1000
        return cDate >= week[week.length - 1].start.unix && cDate <= week[0].end.unix
    }) || []

    return {
        salesTotal: salesTotal,
        salesQuantity: transactions.length,
        profit: salesTotal,
        descendants: lineFiltered.length || 0
    }

}

const getSalesHistory = (data: UserWithAll): [
    recentSalesDay,
    recentSalesDay,
    recentSalesDay,
    recentSalesDay,
    recentSalesDay,
    recentSalesDay,
    recentSalesDay,
] => {
    const week = getPreviousWeek()
    const transactions = data.dashboard.transactions.filter((t) => new Date(t.date).valueOf() / 1000 >= week[week.length - 1].start.unix)
    let sales = week.map((w) => getSalesDay(w, transactions)) as [
        recentSalesDay,
        recentSalesDay,
        recentSalesDay,
        recentSalesDay,
        recentSalesDay,
        recentSalesDay,
        recentSalesDay,
    ]
    return sales
}


export const parseChartData = (user: UserWithAll, data: childrenDataType): ParsedChartData => {
    return {
        previousWeek: getPreviousWeekData(user, data),
        recentSales: [],
        salesByDepth: getSalesByDepth(user, data),
        /// @ts-ignore
        topSellers: [],
        /// @ts-ignore
        salesHistory: getSalesHistory(user),
        totalDescendants: data.length || 0

    }
}
