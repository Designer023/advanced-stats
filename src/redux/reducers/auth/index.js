const initialState = {
    isAuthenticated: false,
    refreshToken: null,
    expiresAt: null,
    accessToken: null
};

// eslint-disable-next-line func-names
export default function (state = initialState, action) {
    if (!action) return state;

    switch (action.type) {
        case "AUTH_LOGGED_OUT":
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("expiresAt");
            localStorage.removeItem("accessToken");
            return { ...initialState };
        case "UPDATE_AUTH_TOKENS":
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            localStorage.setItem("expiresAt", action.payload.expiresAt);
            localStorage.setItem("accessToken", action.payload.accessToken);
            return { ...action.payload };
        case "FETCH_USER":
            return { ...state, isFetching: true, userData: {}, isError: false };
        case "FETCHED_USER":
            return { ...state, userData: action.data, isFetching: false, isError: false };
        case "UPDATE_AUTH_TOKENS_ERROR":
            return { isLoading: false, isError: true, ...state };
        case "UPDATE_ATHLETE_ERROR":
            return { isLoading: false, isError: true, ...state };
        default:
            return state;
    }
}
