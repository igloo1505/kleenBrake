"use client"
import Footer from '../navigation/Footer'
import ReduxProvider from '../strucutre/redux-provider'

const WrappedFooter = () => {
    return (
        <ReduxProvider>
            <Footer />
        </ReduxProvider>
    )
}

export default WrappedFooter
