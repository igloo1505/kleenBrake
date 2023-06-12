import bcryptjs from 'bcrypt'

export const encryptPassword = async (pw: string) => {
    const salt = await bcryptjs.genSalt(10)
    const hashed = await bcryptjs.hash(pw, salt)
    return hashed
}

export const comparePasswords = async (inputPw: string, hashedPw: string) => {
    const match = await bcryptjs.compare(inputPw, hashedPw)
    return match
}



