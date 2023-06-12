"use client"
import 'react'
import 'styles/globals.css'
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import './testing.scss'
import ThemeSourcing from 'components/testing/ThemeSourcing';
/* import WrappedNavbar from '../../components/wrappedComponents/wrappedNavbar'; */
/* import WrappedToast from '../../components/wrappedComponents/wrappedToast'; */
/* import WrappedTitleTextManipulation from '../../components/wrappedComponents/developmentOnly/wrappedTitleTextManipulation'; */
/* import WrappedClientThemeSetter from '../../components/wrappedComponents/developmentOnly/wrappedClientThemeSetter'; */
import ReduxProvider from 'components/strucutre/redux-provider'
import Toast from 'components/ui/Toast';
import ThemeClientSetter from 'components/testing/ThemeClientSetter';
import TitleTextManipulation from 'components/testing/contentManipulation/TitleTextManipulation';
import Navbar from 'components/navigation/Navbar';



const Layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <html lang="en">
            <ThemeSourcing />
            <body>
                <ReduxProvider>
                    <Toast />
                    <ThemeClientSetter />
                    <TitleTextManipulation />
                    <Navbar />
                    <div className='px-4 pt-2 pb-4'>
                        {children}
                    </div>
                </ReduxProvider>
            </body>
        </html>
    )
}


export default Layout
