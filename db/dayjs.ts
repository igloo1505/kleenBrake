import { DayOfWeek, days } from '#/types/chartData'
import dayjs, { Dayjs } from 'dayjs'

var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

export const getTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Chicago"
}

export const startOfDay = () => {
    return dayjs().startOf("day")
}

export const dayOfWeek = () => {
    return dayjs().get('day')
}

export const getPreviousDays = (offset: number = 1) => {
    return startOfDay().subtract(offset, 'day')
}

export interface dayOfWeekInterface {
    label: DayOfWeek
    start: {
        date: Date,
        unix: number
    }
    end: {
        date: Date,
        unix: number
    }
}


const getDayInterface = (offset: number): dayOfWeekInterface => {
    const today = startOfDay()
    if (offset === 0) {
        const endOfDay = dayjs().endOf("day")
        return {
            label: days[today.day()],
            start: {
                date: today.toDate(),
                unix: today.unix()
            },
            end: {
                date: endOfDay.toDate(),
                unix: endOfDay.unix()
            }
        }
    }
    const start = startOfDay().subtract(offset, "day")
    const end = start.endOf("day")
    return {
        label: days[start.day()],
        start: {
            date: start.toDate(),
            unix: start.unix()
        },
        end: {
            date: end.toDate(),
            unix: end.unix()
        }
    }
}

export const getPreviousWeek = (offset: number = 0): [
    dayOfWeekInterface,
    dayOfWeekInterface,
    dayOfWeekInterface,
    dayOfWeekInterface,
    dayOfWeekInterface,
    dayOfWeekInterface,
    dayOfWeekInterface
] => {
    return [0, 1, 2, 3, 4, 5, 6].map((n) => getDayInterface(n + (7 * offset))) as [
        dayOfWeekInterface,
        dayOfWeekInterface,
        dayOfWeekInterface,
        dayOfWeekInterface,
        dayOfWeekInterface,
        dayOfWeekInterface,
        dayOfWeekInterface
    ]
}


export default dayjs
