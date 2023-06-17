// import { prisma } from "#/db/db"

// const dummyNumbers = [
//     "One",
//     "Two",
//     "Three",
//     "Four",
//     "Five",
//     "Six",
//     "Seven",
//     "Eight",
//     "Nine",
//     "Ten"
// ]

// const userData = dummyNumbers.map((n) => ({
//     username: `user${n}`,
//     email: `user${n}@gmail.com`,
//     password: `user${n}123!`
// }))

// const users = async () => {
//     let data = []
//     for (var i = 0; i < userData.length; i++) {
//         let user = {
//             ...userData[i]
//             password: await encryptPassword(user[password])
//         }
//     }
// }
// const seed = async () => {
//     const users = await prisma.user.createMany({

//     })
// }

// seed()
