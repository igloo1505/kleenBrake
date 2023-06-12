

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

