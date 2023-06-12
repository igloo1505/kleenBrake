import React from 'react'



interface DividerWithTextProps {
    children: React.ReactNode
    align?: "left" | "center" | "right"
    thickness?: string
    color?: string
}


const styleSet = {
    long: {
        flexGrow: 1,
        backgroundColor: "red"
    },
    short: {
        minLength: "20%"
    },
    fit: {},
    even: {},
}

const getStyle = (sec: "left" | "right" | "main", alignment: "left" | "center" | "right") => {
    if (alignment === "left") {
        if (sec === "left") return styleSet.short
        if (sec === "right") return styleSet.long
    }
    if (alignment === "right") {
        if (sec === "left") return styleSet.long
        if (sec === "right") return styleSet.short
    }
    if (alignment === "center") {
        if (sec === "left") return styleSet.even
        if (sec === "right") return styleSet.even
    }
    return styleSet.even
}


const getGridStyles = (alignment: "left" | "center" | "right"): string => {
    if (alignment === "left") {
        return "1fr auto 3fr"
    }
    if (alignment === "right") {
        return ""
    }
    if (alignment === "center") {
        return "1fr auto 1fr"
    }
    return "1fr auto 1fr"
}

const DividerWithText = (props: DividerWithTextProps) => {
    const align = props.align || "center"
    const gridCols = getGridStyles(align)
    const thickness = props.thickness || "4px"
    const color = props.color || "var(--primary-color)"
    return (
        <div className={'w-full grid gap-2'}
            style={{
                gridTemplateColumns: gridCols
            }}
        >
            <div className={'h-full w-full flex justify-center items-center'}>
                <div className={'w-full'} style={{
                    height: thickness,
                    backgroundColor: color
                }} />
            </div >
            <div className={'w-fit'}> {props.children} </div>
            <div className={'h-full w-full flex justify-center items-center'}>
                <div className={'w-full'} style={{
                    height: thickness,
                    backgroundColor: color
                }} />
            </div >
        </div>
    )
}



export default DividerWithText;
