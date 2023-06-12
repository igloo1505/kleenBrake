import type { NextPage } from 'next';
import LoginCard from 'components/authentication/LoginCard';
import LoginPageHeader from 'components/authentication/LoginPageHeader';
import CallToLogin from 'components/authentication/CallToRegisterCard';


const Login: NextPage = () => {
    return (
        <div className={'flex flex-col justify-center items-center'}>
            <LoginPageHeader />
            <div className={'w-fit mdlg:w-full max-w-screen-lg h-min grid-cols-1 grid-rows-2 mdlg:grid-cols-2 mdlg:grid-rows-1 grid place-items-center gap-4 mdlg:gap-6'}
            >
                <LoginCard />
                <CallToLogin />
            </div>
        </div>
    )
}



export default Login;
