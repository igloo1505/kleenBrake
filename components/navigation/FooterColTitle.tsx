import React from 'react'



interface FooterColTitleProps {
    title: string
}

const FooterColTitle = (props: FooterColTitleProps) => {
    return (
        <div className={'text-2xl mb-2'}>{props.title}</div>
    )
}



export default FooterColTitle;
