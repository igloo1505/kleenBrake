import store from '../../state/store'

const themeRootPath = "/assets/development/styles/themes/"

interface ProductionThemeSourcingProps {

}

const ProductionThemeSourcing = (props: ProductionThemeSourcingProps) => {
    const uiState = store.getState().UI
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        uiState.darkMode = true
    }
    return (
        <head>
            <link rel="stylesheet" href={`${themeRootPath}/soho-dark/theme.css`} media={uiState.darkMode ? "" : "none"} id={uiState.lightId} />
            <link rel="stylesheet" href={`${themeRootPath}/soho-light/theme.css`} media={!uiState.darkMode ? "" : "none"} id={uiState.darkId} />
        </head>
    )
}



export default ProductionThemeSourcing;
