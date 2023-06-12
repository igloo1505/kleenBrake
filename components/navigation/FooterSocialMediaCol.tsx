import React from 'react'
import FooterColTitle from './FooterColTitle';
import { AppDataType, SocialEnum, SocialType } from '../../state/initial/appData';
import Link from 'next/link';
import { FaYoutubeSquare, FaInstagramSquare, FaFacebook, FaTwitterSquare } from 'react-icons/fa'
import { IconType } from 'react-icons/lib';
import Button from '../io/Button';


const iconMap = {
    [SocialEnum.youtube]: FaYoutubeSquare,
    [SocialEnum.instagram]: FaInstagramSquare,
    [SocialEnum.facebook]: FaFacebook,
    [SocialEnum.twitter]: FaTwitterSquare
}

const SocialButton = ({ item }: { item: SocialType }) => {
    const Icon = iconMap[item.iconKey]
    return (
        <Link href={item.url}>
            <Button raised className={'socialButton'}>
                <Icon className={'w-[2rem] h-auto'} />
            </Button>
        </Link>
    )
}


const FooterSocialMedia = ({ socials }: { socials: AppDataType['socials'] }) => {
    return (
        <div className={'w-full h-full flex flex-col justify-start items-center'}>
            <FooterColTitle title={"Our Socials"} />
            <div className={'w-full h-fit flex flex-row justify-center items-center gap-2'}>
                {socials.map((s, i) => {
                    return <SocialButton item={s} key={`social-button-${i}`} />
                })}
            </div>
        </div>
    )
}



export default FooterSocialMedia;
