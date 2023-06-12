"use client"
import 'react'
import 'styles/globals.css'
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import './testing.scss'
import ReduxProvider from 'components/strucutre/redux-provider'
import WrappedThemeSourcing from '@/wrappedComponents/developmentOnly/wrappedThemeSourcing';



const Layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <WrappedThemeSourcing />
            <ReduxProvider>
                <div className='px-4 pt-2 pb-4'>
                    {children}
                </div>
            </ReduxProvider>
        </>
    )
}


export default Layout
