export const validateUsername = (val: string) => {
    if (val.length >= 16) {
        return false
    }
    const invalidChars = "\\/><;:'\"[]{}+=|-)(*&^%$#@!.?,)".split("")
    let isValid = true
    invalidChars.forEach((c) => {
        if (val.indexOf(c) !== -1) {
            isValid = false
        }
    })
    return isValid
}

const specialChars = "!@#$%^&*(){}[.,<>;:'|]".split("")

export const validatePassword = (val: string) => {
    if (val.length < 8) {
        return false
    }
    let isValid = false
    specialChars.forEach((c) => {
        if (val.indexOf(c) >= 0) {
            isValid = true
        }
    })
    return isValid
}

export const comparePasswordInputs = (val1: string, val2: string) => {
    return val1 === val2
}

export const validateEmail = (val: string) => {
    if (val.indexOf("@") === -1 || val.indexOf(".") === -1) {
        return false
    }
    return true
}
