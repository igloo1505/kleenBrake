import { checkAuthenticated } from 'utils/authWithCookiesHook';
import AuthenticatedHome from 'components/landing/authenticatedHome/AuthenticatedHome';
import WrappedUnauthenticatedHome from 'components/wrappedComponents/developmentOnly/wrappedUnauthenticatedHome';
import 'styles/landing.scss'

const HomePage = async () => {
    const authenticated = await checkAuthenticated()
    if (!authenticated) {
        return (
            <div>
                <WrappedUnauthenticatedHome />
            </div>
        )
    }
    return (
        <>
            <AuthenticatedHome />
        </>
    )
}

HomePage.displayName = "UnAuthenticatedHome"


export default HomePage;
