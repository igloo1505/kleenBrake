import dayjs, { dayOfWeekInterface, getPreviousWeek } from "#/db/dayjs"
import { DashboardWithAll, UserWithAll, childrenDataType } from "#/state/types/AuthTypes"
import { dateFormatNoTime, dateFormatWithTime } from "#/utils/formatting"
import { Transaction, User } from "@prisma/client"
import resolveConfig from 'tailwindcss/resolveConfig'
import config from '../tailwind.config'


const calculateProfit = (t: Transaction) => {
    // BUG: This still needs to be fixed in multiple places.
    return t.price
}

export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"


export const getChartColor = (n: number, alpha: number = 400, darkMode: boolean = true) => {
    const tw = resolveConfig(config)
    const colorList = tw.theme?.colors
    if (n < 0) {
        if (n === -1 || n === -2) {
            return darkMode ? "#fff" : "#000"
        }
        if (n === -2) {
            // NOTE: This will never be reached currently. If the above block looks good get rid of this.

            /// @ts-ignore
            return colorList[darkMode ? "primary" : "primaryLight"] || "#737373"
        }
        if (n === -3) {
            /// @ts-ignore
            return colorList["stone"]["600"] || "#212121"
        }
    }
    const colors = [
        "blue",
        "yellow",
        "indigo",
        "lime",
        "orange",
        "sky",
        "fuchsia",
    ]
    let c: string | false = false
    if (n < colors.length) {
        c = colors[n]
    }
    if (n > colors.length) {
        c = colors[colors.length % n]
    }
    /// @ts-ignore
    const colorVal: string = colorList && c ? colorList[c][`${alpha}`] : "transparent"
    return colorVal || "transparent"
}

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
        unix: number
        display: string
    }
    transactionId: number
    transaction: Transaction
}

export interface SalesByDepth {
    depth: number
    total: number
    quantity: number
}


type salesWeek = [
    recentSalesDay,
    recentSalesDay,
    recentSalesDay,
    recentSalesDay,
    recentSalesDay,
    recentSalesDay,
    recentSalesDay,
] | recentSalesDay[]

export interface ParsedChartData {
    previousWeek: {
        salesTotal: number
        salesQuantity: number
        profit: number
        descendants: number
        salesByDay: salesWeek
    }
    totals: {
        revenue: number
        quantity: number
    }
    salesByDepth: SalesByDepth[],
    salesHistory: salesWeek
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
                    unix: d.unix(),
                    display: d.format(dateFormatWithTime)
                },
                transactionId: t.id,
                transaction: t
            })
        })
    })
    return tmp.sort((a, b) => b.date.unix - a.date.unix)
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

interface TimeInterface {
    start: number
    end: number
}

export const getPreviousWeekTransactions = (sales: ReturnType<typeof getRecentSales>, times: TimeInterface) => {
    return sales.filter((s) => s.date.unix <= times.end)
}


export const getPreviousWeekDescendants = (users: childrenDataType, times: TimeInterface) => {
    return users.filter((s) => {
        const d = dayjs(s.createdAt).unix()
        return d <= times.end
    })
}


const getSalesHistory = (data: ReturnType<typeof getRecentSales>, offset: number = 0): recentSalesDay[] => {
    console.log("data: ", data)
    const week = getPreviousWeek(offset)
    console.log("week: ", week)
    const grouped = week.map((w) => ({
        day: w.label,
        transactions: data.filter((d) => d.date.unix > w.start.unix && d.date.unix <= w.end.unix
        )
    })).map((g) => ({
        ...g,
        transactions: g.transactions.map((t) => t.transaction),
        totalSales: g.transactions.length > 0 ? g.transactions.map((l) => l.amount).reduce((a, b) => a + b) : 0,
        totalQuantity: g.transactions.length > 0 ? g.transactions.length : 0,
        totalProfit: g.transactions.length > 0 ? g.transactions.map((l) => l.profit).reduce((a, b) => a + b) : 0
    }))
    return grouped
}


export const parseChartData = (user: UserWithAll, data: childrenDataType): ParsedChartData => {
    const byDepth = getSalesByDepth(user, data)
    const topSellers = getTopSellers(byDepth.grouped)
    const recentSales = getRecentSales(topSellers)
    const previousWeek = getPreviousWeek(1)
    const times = {
        start: previousWeek[previousWeek.length - 1].start.unix,
        end: previousWeek[0].end.unix
    }
    const previousWeekTransactions = getPreviousWeekTransactions(recentSales, times)
    const previousWeekDescendants = getPreviousWeekDescendants(data, times)
    const previousWeekAmounts = previousWeekTransactions.length > 0 ? previousWeekTransactions.map((t) => t.amount) : []
    return {
        recentSales: recentSales,
        salesByDepth: byDepth.salesByDepth,
        topSellers: topSellers,
        salesHistory: getSalesHistory(recentSales, 0),
        totalDescendants: data.length || 0,
        totals: {
            revenue: recentSales.map((s) => s.amount).reduce((a, b) => a + b) || 0,
            quantity: recentSales.length
        },
        previousWeek: {
            salesTotal: previousWeekTransactions.length,
            salesQuantity: previousWeekAmounts.length > 0 ? previousWeekAmounts.reduce((a, b) => a + b) : 0,
            profit: previousWeekTransactions.length > 0 ? previousWeekTransactions.map((t) => calculateProfit(t.transaction)).reduce((a, b) => a + b) : 0,
            salesByDay: getSalesHistory(recentSales, 1),
            descendants: previousWeekDescendants.length || 0
        }
    }
}
