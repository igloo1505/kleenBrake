import dayjs from 'dayjs'
import urlencode from 'urlencode'

const excludeCharacters = ",./\\;:'\"[]{}!@#$%^&*()|`~"

export const formatTagText = (tag: string) => {
    let s = ""
    Array.from(tag).forEach((c) => {
        if (excludeCharacters.indexOf(c) === -1) {
            s += c
        }
    })
    return s
}

export const numberToDisplayString = (val: string | number) => {
    let v = String(Math.round(Number(val)))
    let s = ""
    let l = v.length
    for (var i = l; i >= 0; i--) {
        // s += v.charAt(i)
        s = `${v.charAt(i)}${s}`
        if ((l - i) % 3 === 0 && i !== 0 && i !== v.length) {
            // s += ","
            s = `,${s}`
        }
    }
    return s
}

export const formatDollars = (val: string | number) => {
    return `$${numberToDisplayString(val)}`
}

export const capitalizeWord = (s: string): string => {
    return `${s.charAt(0).toUpperCase()}${s.slice(1, s.length)}`
}


export const formatHost = (host: string) => {
    return host.startsWith("http://") || host.startsWith("https://") ? host : `http://${host}`
}

export const formatDate = (d: Date, time?: boolean) => {
    const formatStr = time ? "MM-D-YY [at] h:mm a" : "MM-D-YY"
    return dayjs(d).format(formatStr)
}

export const formatGoogleMapsQuery = ({ street, city, state, zip }: { street: string, city?: string, state: string, zip?: number }) => {
    let str = 'https://www.google.com/maps/search/'
    str += urlencode.encode(street)
    if (city) {
        str += ",+"
        str += urlencode.encode(city)
    }
    str += ",+"
    str += urlencode.encode(`${state || "Il"}`)
    if (zip) {
        str += ",+"
        str += urlencode.encode(`${zip}`)
    }
    return str
}
