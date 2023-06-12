"use client"
import UnauthenticatedHome from '../../landing/Unauthenticated'
import ReduxProvider from '../../strucutre/redux-provider'



const WrappedUnauthenticatedHome = () => {
    return (
        <ReduxProvider>
            <UnauthenticatedHome />
        </ReduxProvider>
    )
}



export default WrappedUnauthenticatedHome 
