const initialState = {
    isLoading: false
};

export default function (state = initialState, action) {
    if (!action) return state;

    switch (action.type) {
        case "START_LOADING":
            return { isLoading: true };
        case "END_LOADING":
            return { isLoading: false };
        default:
            return state;
    }
}
