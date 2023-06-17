import { evaluateTransactionCode } from '#/utils/evaluateTransactionCode'
import React from 'react'



interface AuthenticateTransactionPageProps {
    params: {
        transactionCode: string
    }
}

const AuthenticateTransactionPage = async ({ params: {
    transactionCode
} }: AuthenticateTransactionPageProps) => {
    const acceptedData = await evaluateTransactionCode(transactionCode)
    return (
        <div>Evaluating Transaction</div>
    )
}


AuthenticateTransactionPage.displayName = "AuthenticateTransactionPage"


export default AuthenticateTransactionPage;
