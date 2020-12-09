const initialState = {
    dirty: true,
    loading: false,
    error: false,
    activities: {
        run: {},
        ride: {}
    },
    eddington: {
        run: {
            overall: 0,
            breakdown: [0],
            years: [
                {
                    year: 2020,
                    score: 0,
                    breakdown: [0]
                }
            ]
        },
        ride: {
            overall: 0,
            breakdown: [0],
            years: [
                {
                    year: 2020,
                    score: 0,
                    breakdown: [0]
                }
            ]
        }
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_LOGGED_OUT":
            return { ...initialState };
        case "LOADING_ACTIVITIES_START":
            return { ...state, dirty: true };
        case "PROCESSING_DATA_END":
            return { ...state, dirty: false, ...action.payload };
        default:
            return state;
    }
};
