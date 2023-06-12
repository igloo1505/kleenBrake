import type { NextPage } from 'next';
import SignUpCard from 'components/authentication/signup/Card';
import SignupTitle from 'components/authentication/signup/SignupTitle';


const Signup: NextPage = () => {
    return (
        <div className={'w-full flex flex-col gap-4 justify-center items-center'}>
            <SignupTitle />
            <SignUpCard />
        </div>
    )
}



export default Signup;
