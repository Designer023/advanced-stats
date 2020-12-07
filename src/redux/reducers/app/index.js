const initialState = {
    isLoading: false
};

export default (state = initialState, action) => {
    if (!action) return state;

    switch (action.type) {
        case "LOADING_START":
            return { isLoading: true };
        case "LOADING_END":
            return { isLoading: false };
        default:
            return state;
    }
};
