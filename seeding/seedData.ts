import { CreateJobType } from "#/types/jobTypes";
import { Prisma } from "@prisma/client";

const testPassword = "Password123!"

const nums = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eightteen",
    "Nineteen",
    "Twenty",
    "TwentyOne",
    "TwentyTwo",
    "TwentyThree",
    "TwentyFour",
    "TwentyFive",
    "TwentySix",
    "TwentySeven",
    "TwentyEight",
    "TwentyNine",
    "Thirty",
    "ThirtyOne",
    "ThirtyTwo",
    "ThirtyThree",
    "ThirtyFour",
    "ThirtyFive",
    "ThirtySix",
    "ThirtySeven",
    "ThirtyEight",
    "ThirtyNine",
    "Fourty",
    "FourtyOne",
    "FourtyTwo",
    "FourtyThree",
    "FourtyFour",
    "FourtyFive",
    "FourtySix",
    "FourtySeven",
    "FourtyEight",
    "FourtyNine",
    "Fifty",
    "FiftyOne",
    "FiftyTwo",
    "FiftyThree",
    "FiftyFour",
    "FiftyFive",
    "FiftySix",
    "FiftySeven",
    "FiftyEight",
    "FiftyNine",
    "Sixty",
    "SixtyOne",
    "SixtyTwo",
    "SixtyThree",
    "SixtyFour",
    "SixtyFive",
    "SixtySix",
    "SixtySeven",
    "SixtyEight",
    "SixtyNine",
    "Admin",
    "Employee"
]


export const users: Omit<Prisma.UserCreateManyInput, "dashboardId" | "lineageId">[] = nums.map((n, i): Omit<Prisma.UserCreateManyInput, "dashboardId" | "lineageId"> => {
    return {
        username: `user${n}`,
        email: `user${n}@gmail.com`,
        password: testPassword,
        ...(n === "Admin" && { role: "ADMIN" }),
        ...(n === "Employee" ? { role: "EMPLOYEE" } : { role: "REP" }),
    }
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

const _jobs: CreateJobType[] = []

for (var i = 0; i < 50; i++) {
    _jobs.push(
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

export const jobs = _jobs
