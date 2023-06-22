import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import qr from 'qr-image'
import { getQrData } from "#/utils/serverUtils";
import { isAuthenticatedAdmin } from "#/utils/serverUtils";
import { isAuthenticated, verifyToken } from "#/utils/auth";



interface RequestContext {
    // params: {
    // }
}


const handler = createRouter()


handler.get(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
    try {
        console.log("In getQr Route")
        // const userId = await isAuthenticated(req)
        const userId = req.cookies?.userId
        const auth = req.cookies?.auth
        const authed = await verifyToken(auth, userId)
        if (!authed) {
            console.error("Not authenticated to retrieve referer qr image")
            return res.redirect("/")
        }
        const host = req.headers?.host
        const qrPng = qr.image(`${host}/referer/${userId}`, { type: "png" })
        qrPng.pipe(res)
    } catch (err) {
        console.error(err)
        return res.json({ success: false })
    }
})



export default handler.handler()

export const config = {
    api: {
        bodyParser: false,
    },
};

