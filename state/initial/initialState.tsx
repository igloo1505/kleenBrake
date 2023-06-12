import authState from "./authState";
import initialUiState from "./uiState";
import developmentState from "./developmentState";


const initialState = {
    auth: authState,
    UI: initialUiState,
    development: developmentState,
}


export default initialState
