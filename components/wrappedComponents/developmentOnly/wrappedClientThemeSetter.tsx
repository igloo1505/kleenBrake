"use client"
import ReduxProvider from '../../strucutre/redux-provider'
import ThemeClientSetter from '../../testing/ThemeClientSetter'



const WrappedClientThemeSetter = () => {
    return (
        <ReduxProvider>
            <ThemeClientSetter />
        </ReduxProvider>
    )
}



export default WrappedClientThemeSetter 
