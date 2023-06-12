import bcrypt from 'bcrypt'

export class PrismaUser {
    email: string
    password: string
    saltRounds: number = 10
    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }
    async encryptedPassword() {
        const salt = await bcrypt.genSalt(this.saltRounds)
        return await bcrypt.hash(this.password, salt)
    }

    async comparePassword(encrypted: string) {
        return bcrypt.compareSync(this.password, encrypted)
    }
}
