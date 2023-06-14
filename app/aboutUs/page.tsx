import AboutUsTopSection from '@/aboutUs/AboutUsTop';
import MissionStatementSection from '@/aboutUs/MissionStatementSection';
import Team from '@/aboutUs/team';
import type { NextPage } from 'next';



const AboutUsPage: NextPage = () => {
    return (
        <div className={'w-full flex flex-col justify-center items-center gap-4'}
        >
            <AboutUsTopSection />
            <MissionStatementSection />
            <Team />
        </div>
    )
}



export default AboutUsPage;
