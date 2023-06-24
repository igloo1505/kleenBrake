"use client"
import LoadingIndicator from '@/ui/loadingIndicator'
import ReduxProvider from '../strucutre/redux-provider'

const WrappedLoadingIndicator = () => {
    return (
        <ReduxProvider>
            <LoadingIndicator />
        </ReduxProvider>
    )
}

export default WrappedLoadingIndicator
