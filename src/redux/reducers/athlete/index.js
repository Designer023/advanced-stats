import unionBy from "lodash/unionBy";

const initialState = {
    loading: false,
    error: false,
    details: null,
    stats: null,
    activities: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_LOGGED_OUT":
            return { ...initialState };
        case "LOADING_ACTIVITIES_START":
            return { ...state, loading: true, error: false };
        case "LOADING_ACTIVITIES_END":
            return { ...state, loading: false, error: false };
        case "LOADING_ACTIVITIES_ERROR":
            return { ...state, loading: false, error: true };
        case "LOADING_ACTIVITIES_PAGE_COMPLETE":
            // eslint-disable-next-line no-case-declarations
            const activities = unionBy(state.activities, action.payload, "id");
            return { ...state, activities };
        case "LOADING_ATHLETE_DETAILS_COMPLETE":
            return { ...state, details: action.payload };

        default:
            return state;
    }
};