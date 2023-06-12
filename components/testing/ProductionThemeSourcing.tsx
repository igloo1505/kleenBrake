import store from '../../state/store'

const themeRootPath = "/assets/development/styles/themes/"

interface ProductionThemeSourcingProps {

}

const ProductionThemeSourcing = (props: ProductionThemeSourcingProps) => {
    const uiState = store.getState().UI
    return (
        <head>
            <link rel="stylesheet" href={`${themeRootPath}/viva-dark/theme.css`} media={uiState.darkMode ? "" : "none"} id={uiState.lightId} />
            <link rel="stylesheet" href={`${themeRootPath}/viva-light/theme.css`} media={!uiState.darkMode ? "" : "none"} id={uiState.darkId} />
        </head>
    )
}



export default ProductionThemeSourcing;
