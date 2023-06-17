import { evaluateTransactionCode } from '#/utils/evaluateTransactionCode'
import React from 'react'



interface AuthenticateTransactionProps {
    params: {
        transactionCode: string
    }
}


const AuthenticateTransaction = async ({ params: {
    transactionCode
} }: AuthenticateTransactionProps) => {
    const acceptedData = await evaluateTransactionCode(transactionCode)
    return (
        <div>Accepting Transaction Data</div>
    )
}


AuthenticateTransaction.displayName = "AuthenticateTransaction"


export default AuthenticateTransaction;
