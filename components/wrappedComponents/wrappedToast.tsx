"use client"
import ReduxProvider from '../strucutre/redux-provider'
import Toast from '../ui/Toast'

const WrappedToast = () => {
    return (
        <ReduxProvider>
            <Toast />
        </ReduxProvider>
    )
}


export default WrappedToast
