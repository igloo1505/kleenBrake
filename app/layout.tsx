import 'react'
import 'styles/globals.css'
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import ProductionThemeSourcing from 'components/testing/ProductionThemeSourcing';
import WrappedToast from 'components/wrappedComponents/wrappedToast';
import WrappedNavbar from 'components/wrappedComponents/wrappedNavbar';
import WrappedFooter from 'components/wrappedComponents/wrappedFooter';
import WrappedModals from 'components/wrappedComponents/wrappedModals';
import { checkAuthenticated } from '#/utils/authWithCookiesHook';
import WrappedAuthObserver from '@/wrappedComponents/wrappedAuthObserver';
import WrappedLoadingIndicator from '@/wrappedComponents/wrappedLoadingIndicator';
import WrappedScreenMessage from '@/wrappedComponents/wrappedScreenMessage';



const Layout = async ({ children, media }: {
    children: React.ReactNode,
    media: any,
}) => {
    const isAuthed = await checkAuthenticated()
    return (
        <html lang="en">
            <ProductionThemeSourcing />
            <body>
                <WrappedAuthObserver authenticated={isAuthed} />
                <WrappedModals />
                <WrappedNavbar />
                <WrappedLoadingIndicator />
                <WrappedScreenMessage />
                <WrappedToast />
                <div className='pt-2 pb-4' style={{
                    minHeight: "calc(100vh - 260px)"
                }}>
                    {children}
                    {media}
                </div>
                <WrappedFooter />
            </body>
        </html>
    )
}


export default Layout 
