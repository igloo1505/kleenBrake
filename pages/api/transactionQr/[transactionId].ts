import { createEdgeRouter, createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import qr from 'qr-image'
import { getQrData } from "#/utils/serverUtils";
import { isAuthenticatedAdmin } from "#/utils/serverUtils";


const dummyTransactionData = {
    price: 12.43
}


interface RequestContext {
    params: {
        transactionId: string
    }
}


const handler = createRouter()


handler.get(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
    try {
        const isAdmin = await isAuthenticatedAdmin(req)
        const host = req.headers?.host
        if (!isAdmin) {
            return res.status(401).json({
                success: false,
                consoleError: "Unauthorized"
            })
        }
        let qrData = await getQrData(req.query?.transactionId || "", dummyTransactionData.price)
        let stringified = JSON.stringify(qrData)
        if (stringified.charAt(0) === '"') {
            stringified = stringified.slice(1, stringified.length)
        }
        if (stringified.charAt(stringified.length - 1) === '"') {
            stringified = stringified.slice(0, stringified.length - 2)
        }
        qrData = `${host}/authenticateTransaction/${stringified}`
        console.log("qrData: ", qrData)
        const qrPng = qr.image(qrData, { type: "png" })
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

