"use client"
import ReduxProvider from '../strucutre/redux-provider'
import Modals from '../ui/modals/Modals'


const WrappedModals = () => {
    return (
        <ReduxProvider>
            <Modals />
        </ReduxProvider>
    )
}


export default WrappedModals
