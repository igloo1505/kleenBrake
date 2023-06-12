import AboutUsTopSection from '@/aboutUs/AboutUsTop';
import Team from '@/aboutUs/team';
import type { NextPage } from 'next';



interface AboutUsPageProps {

}

const AboutUsPage: NextPage = (props: AboutUsPageProps) => {
    return (
        <div className={'w-full flex flex-col justify-center items-center gap-4'}
        >
            <AboutUsTopSection />
            <Team />
        </div>
    )
}



export default AboutUsPage;
