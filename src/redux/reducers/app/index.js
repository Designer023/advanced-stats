const initialState = {
    isLoading: false,
    loadingMessage: "Please wait..."
};

export default (state = initialState, action) => {
    if (!action) return state;

    switch (action.type) {
        case "LOADING_START":
            return { ...state, isLoading: true };
        case "LOADING_END":
            return { ...state, isLoading: false };
        case "SET_LOADING_MESSAGE":
            return { ...state, loadingMessage: action.payload };
        case "RESET_LOADING_MESSAGE":
            return { ...state, loadingMessage: initialState.loadingMessage };
        default:
            return state;
    }
};
