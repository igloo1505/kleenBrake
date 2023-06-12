"use client"
import ReduxProvider from '@/strucutre/redux-provider'
import ThemeSourcing from '@/testing/ThemeSourcing'



const WrappedThemeSourcing = () => {
    return (
        <ReduxProvider>
            <ThemeSourcing />
        </ReduxProvider>
    )
}


export default WrappedThemeSourcing

