import dayjs, { dayOfWeekInterface, getPreviousWeek } from "#/db/dayjs"
import { DashboardWithAll, UserWithAll, childrenDataType } from "#/state/types/AuthTypes"
import { dateFormatNoTime } from "#/utils/formatting"
import { Transaction, User } from "@prisma/client"

const calculateProfit = (t: Transaction) => {
    // BUG: This still needs to be fixed in multiple places.
    return t.price
}

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
    salesTotal: number
    salesQuantity: number
    thisWeek?: {
        salesTotal: number
        salesQuantity: number
    }
    transactions: Transaction[]
}

export interface RecentSale {
    soldBy: topSeller
    amount: number
    profit: number
    date: {
        val: number
        display: string
    }
    transactionId: number
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
    topSellers: {
        byQuantity: topSeller[]
        byValue: topSeller[]
    }
    totalDescendants: number
    recentSales: RecentSale[]
}


const getSalesTotal = (u: UserWithAll | UserWithChildrenAndTransactions) => {
    let total = 0
    u.dashboard.transactions.forEach((d) => total += d.price)
    return total
}


const getSalesQuantity = (u: UserWithAll | UserWithChildrenAndTransactions) => {
    let quant = 0
    u.dashboard.transactions.forEach((d) => quant++)
    return quant
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
    dashboard: DashboardWithAll
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


const getRecentSales = (grouped: ReturnType<typeof getTopSellers>): ParsedChartData['recentSales'] => {
    let tmp: RecentSale[] = []
    grouped.byValue.map((s) => {
        s.transactions.forEach((t) => {
            let d = dayjs(t.date)
            tmp.push({
                soldBy: s,
                amount: t.price,
                profit: calculateProfit(t),
                date: {
                    val: d.unix(),
                    display: d.format(dateFormatNoTime)
                },
                transactionId: t.id

            })
        })
    })
    return [] as ParsedChartData['recentSales']
}


const getTopSellers = (grouped: ReturnType<typeof groupByDepth>): ParsedChartData['topSellers'] => {
    let tmp: topSeller[] = []
    grouped.forEach((depth) => {
        depth.forEach((u) => tmp.push({
            username: u.username,
            salesTotal: getSalesTotal(u),
            salesQuantity: getSalesQuantity(u),
            transactions: u.dashboard.transactions
        }))
    })
    return {
        byValue: tmp.sort((a, b) => b.salesTotal - a.salesTotal),
        byQuantity: tmp.sort((a, b) => b.salesQuantity - a.salesQuantity)
    } as ParsedChartData['topSellers']

}

const getSalesByDepth = (user: UserWithAll, children: childrenDataType): {
    grouped: ReturnType<typeof groupByDepth>
    salesByDepth: ParsedChartData['salesByDepth']
} => {
    const getTotal = (children: childrenDataType) => {
        let total = 0
        children.forEach((c) => {
            c.dashboard.transactions.forEach((d) => total += d.price)
        })
        return total
    }
    const getQuantity = (children: childrenDataType) => {
        let quant = 0
        children.forEach((c) => {
            c.dashboard.transactions.forEach((d) => quant++)
        })
        return quant
    }
    const byDepth = groupByDepth(user, children.reverse())
    return {
        grouped: byDepth,
        salesByDepth: byDepth.map((d, i) => ({
            depth: i + 1,
            total: getTotal(d),
            quantity: getQuantity(d)
        }))
    }
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
    const byDepth = getSalesByDepth(user, data)
    const topSellers = getTopSellers(byDepth.grouped)
    return {
        previousWeek: getPreviousWeekData(user, data),
        recentSales: getRecentSales(topSellers),
        salesByDepth: byDepth.salesByDepth,
        /// @ts-ignore
        topSellers: topSellers,
        /// @ts-ignore
        salesHistory: getSalesHistory(user),
        totalDescendants: data.length || 0
    }
}
