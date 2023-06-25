import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import qr from 'qr-image'
import { getQrData } from "#/utils/serverUtils";
import { isAuthenticatedAdmin } from "#/utils/serverUtils";
import { isAuthenticated, verifyToken } from "#/utils/auth";
import { NextResponse } from "next/server";
import { formatHost } from "#/utils/formatting";



interface RequestContext {
    // params: {
    // }
}


const handler = createRouter()


handler.get(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
    try {
        // const userId = await isAuthenticated(req)
        const userId = req.cookies?.userId
        const auth = req.cookies?.auth
        const authed = await verifyToken(auth, userId)
        if (!authed) {
            console.error("Not authenticated to retrieve referer qr image")
            return res.redirect("/")
        }
        const host = formatHost(req.headers?.host)
        if (!host) {
            return NextResponse.json({
                success: false,
                hostFound: host,
                consoleError: "host not found."
            })
        }
        const targetUrl = `${host}/referer/${userId}`
        console.log("targetUrl: ", targetUrl)
        const qrPng = qr.image(targetUrl, { type: "svg" })
        qrPng.pipe(res)
    } catch (err) {
        console.error(err)
        return res.json({ success: false })
    }
})



export default handler.handler()

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

