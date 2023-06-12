import { prisma } from "../../db/db"


export const getUser = async (id: string | number) => {
    const user = await prisma.user.findFirst({
        where: {
            id: typeof id === "string" ? parseInt(id) : id
        }
    })
    if (user) {
        // @ts-ignore
        delete user.password
    }
    return user
}

