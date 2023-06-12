"use client"
import ReduxProvider from '../../strucutre/redux-provider'
import TitleTextManipulation from '../../testing/contentManipulation/TitleTextManipulation'



const WrappedTitleTextManipulation = () => {
    return (
        <ReduxProvider>
            <TitleTextManipulation />
        </ReduxProvider>
    )
}



export default WrappedTitleTextManipulation 
