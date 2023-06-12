"use client"
import store from '../../../state/store';



const TabButtons = ({ isSeller, setIsSeller }: { isSeller: boolean, setIsSeller: (v: boolean) => void }) => {
    const darkMode = store.getState()?.UI?.darkMode || false
    const inactiveColor = !darkMode ? "var(--primary-200)" : "var(--primary-900)"
    return (
        <div className={'w-full grid grid-cols-2 place-items-center text-lg'}>
            <a role="button" className={'px-2 py-3 w-full text-center transition-all duration-300'}
                style={{
                    borderBottom: `3px solid ${isSeller ? "var(--primary-500)" : inactiveColor}`
                }}
                onClick={() => setIsSeller(true)}
            >
                Seller
            </a>
            <a role="button" className={'px-2 py-3 w-full text-center transition-all duration-300'}
                style={{
                    borderBottom: `3px solid ${!isSeller ? "var(--primary-500)" : inactiveColor}`
                }}
                onClick={() => setIsSeller(false)}
            >
                Buyer
            </a>

        </div>
    )
}

TabButtons.displayName = "TabButtons"

export default TabButtons
