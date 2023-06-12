import { ThemeType, availableThemes } from '../../state/initial/themeTesting'


const ThemeItem = ({ t }: { t: ThemeType }) => {
    let ids = {
        dark: t.darkId(),
        light: t.lightId()
    }
    let activeId: boolean | string | null = false
    if (typeof window !== "undefined" && window.localStorage.getItem("currentTheme")) {
        activeId = window.localStorage.getItem("currentTheme")
    }
    const lightActive = activeId ? ids.light === activeId : t.original === "light"
    const darkActive = activeId ? ids.dark === activeId : t.original === "dark"
    return (
        <>
            {ids.light && <link rel="stylesheet" href={`${t.lightTheme}`} media={lightActive ? "" : "none"} id={ids.light} />}
            {ids.dark && <link rel="stylesheet" href={`${t.darkTheme}`} media={darkActive ? "" : "none"} id={ids.dark} />}
        </>
    )
}

const ThemeSourcing = () => {
    return (
        <head>
            {availableThemes.map((t, i) => {
                return (
                    <ThemeItem t={t} key={`theme-item-${i}`} />
                )
            })}
        </head>
    )
}



export default ThemeSourcing;
