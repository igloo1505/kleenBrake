"use client"
import Navbar from '../navigation/Navbar'
import ReduxProvider from '../strucutre/redux-provider'

const WrappedNavbar = () => {
    return (
        <ReduxProvider>
            <Navbar />
        </ReduxProvider>
    )
}


export default WrappedNavbar
