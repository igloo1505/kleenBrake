import { CreateJobType } from "#/types/jobTypes";
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


const getPseudoDate = (dateScalar: number = -1000) => {
    return new Date(Date.now() + Math.floor(dateScalar * Math.random()))
}

const getRandomQuantity = () => {
    return Math.floor(Math.random() * 8)
}

const locations = [
    {
        street: "916 E. State St.",
        city: "Milwaukee",
        unit: "305",
        zip: 60607
    },
    {
        street: "123 E. Main St.",
        city: "Chicago",
        unit: "203",
        zip: 60607
    },
    {
        street: "413 S. Broadway",
        city: "Chicago",
        zip: 60607
    },

]

const fakeLocation = (): Prisma.LocationCreateWithoutJobInput => {
    return locations[Math.floor(Math.random() * locations.length)]
}

export const jobs: CreateJobType[] = []

for (var i = 0; i < 50; i++) {
    jobs.push(
        {
            job: {
                dateSubmitted: getPseudoDate(),
                quantity: getRandomQuantity(),
            },
            pickup: {
                start: getPseudoDate(23400),
                end: getPseudoDate(23400),
            },
            dropoff: {
                start: getPseudoDate(23400),
                end: getPseudoDate(23400),
            },
            location: fakeLocation()
        })
}
