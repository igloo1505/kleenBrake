import clsx from 'clsx';
import Image from 'next/image';
import React from 'react'



interface DailyQrCodeProps {
    styles?: React.CSSProperties
    className?: string
}

const DailyQrCode = ({ styles, className }: DailyQrCodeProps) => {
    return (
        <Image src="/api/transactionQr" alt="Transaction Qr Code" className={clsx(className && className)} style={{
            ...(styles && { ...styles })
        }} />
    )
}


DailyQrCode.displayName = "DailyQrCode"


export default DailyQrCode;
