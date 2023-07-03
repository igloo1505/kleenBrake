import axios from 'axios'
import { jobs, users } from './seedData'
import { NewUserData } from '../state/types/AuthTypes'
import { defaultAxiosConfig } from '../state/types/NetworkTypes'
import { Prisma, User } from '@prisma/client'
// import { Prisma } from '@prisma/client'
// import { parseCreateJob } from '../utils/serverUtils'
// import { prisma } from '../db/db'
//
const focusChildren = 20

const root = "http://localhost:3000"

// const seededUsers: User[] = []

const seedUser = async (user: Omit<Prisma.UserCreateManyInput, "dashboardId" | "lineageId">, seededUsers: User[] = []) => {
    const l = seededUsers.length > focusChildren ? focusChildren : seededUsers.length
    const refererId = seededUsers[Math.floor(Math.random() * l)]?.id
    const data: NewUserData = {
        username: user.username,
        password: user.password,
        email: user.email,
        ...(typeof refererId === "number" && { refererId: refererId }),
        age: 18 + Math.floor(Math.random() * (100 - 18)),
        confirmAge: true,
        agreeToTerms: true
    }
    const res = await axios.post(`${root}/api/users/createUser`, { user: data }, defaultAxiosConfig)
    return res.data.newUser ? [...seededUsers, res.data.newUser] : seededUsers
}

const seedUsers = async () => {
    let seededUsers = []
    for (var i = 0; i < users.length; i++) {
        seededUsers = await seedUser(users[i], seededUsers)
    }
}




const seedJobs = async () => {
    await axios.post(`${root}/api/jobs/seed`, {}, defaultAxiosConfig)
}

seedUsers()
seedJobs()

