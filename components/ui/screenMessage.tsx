import React from 'react'
import { RootState } from '#/state/store';
import { connect } from 'react-redux';
import { Grid, MutatingDots } from 'react-loader-spinner'
import clsx from 'clsx';

const connector = connect((state: RootState, props: any) => ({
    message: state.UI.screenMessage,
    props: props
}))



interface LoadingIndicatorProps {
    message: string | undefined
}



const ScreenMessage = connector(({ message }: LoadingIndicatorProps) => {
    return (
        <div className={clsx('w-screen h-screen top-0 left-0 fixed flex flex-col gap-4 justify-center items-center z-[999] overflow-hidden transition-all duration-300 bg-black bg-opacity-60', message ? "scale-1" : "scale-0")}>
            <div className={'text-4xl'}>{message}</div>
            <MutatingDots
                height="120"
                width="120"
                color="var(--primary-color)"
                secondaryColor="var(--primary-color)"
                /* secondaryColor='var(--text-color-secondary)' */
                radius='12.5'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={Boolean(message)}
            />
        </div>
    )
})


ScreenMessage.displayName = "LoadingIndicator"


export default ScreenMessage;
