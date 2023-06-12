
"use client"
import AuthObserver from '../../state/authObserver'
import ReduxProvider from '../strucutre/redux-provider'



const WrappedAuthObserver = ({ authenticated }: { authenticated: boolean }) => {
    return (
        <ReduxProvider>
            <AuthObserver authenticated={authenticated} />
        </ReduxProvider>
    )
}



export default WrappedAuthObserver
