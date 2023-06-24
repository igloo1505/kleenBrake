"use client"
import ScreenMessage from '@/ui/screenMessage'
import ReduxProvider from '../strucutre/redux-provider'

const WrappedScreenMessage = () => {
    return (
        <ReduxProvider>
            <ScreenMessage />
        </ReduxProvider>
    )
}

export default WrappedScreenMessage
