import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'


/* const titleText = ["anty", "latform"] */
const titleText = ["ome", "itle"]


const LogoP = ({ initialChar, charList, idx }: { initialChar: string, charList: string, idx: number }) => {
    return (
        <div className={clsx('text-2xl', idx === 1 && 'translate-x-3 -translate-y-3')}>
            <span className={'font-semibold text-4xl'}>{initialChar}</span>
            {charList.split("").map((l, i) => {
                return (
                    <span key={`title-letter-${i}`}>{l}</span>
                )
            })
            }
        </div>
    )
}


const NavbarLogoAsText = () => {
    return (
        <Link href="/">
            <div className={'flex flex-col gap-0 justify-start items-start translate-y-1'}>
                <LogoP initialChar="S" charList={titleText[0]} idx={0} />
                <LogoP initialChar="T" charList={titleText[1]} idx={1} />
            </div>
        </Link>
    )
}



export default NavbarLogoAsText;
