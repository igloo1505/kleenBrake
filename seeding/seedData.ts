import { Prisma } from "@prisma/client";

const testPassword = "Password123!"

const nums = [
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten"
]


export const users: Partial<Prisma.UserCreateManyInput>[] = nums.map((n) => {
    const u: Partial<Prisma.UserCreateManyInput> = {
        username: `user${n}`,
        password: testPassword,
        email: `user${n}@gmail.com`,
        // age: Math.floor(Math.random() * (100 - 18)) + 18,
        // confirmAge: true,
        // agreeToTerms: true
    }
    return u
})
