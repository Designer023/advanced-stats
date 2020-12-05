const initialState = {
    dirty: true,
    loading: false,
    error: false,
    activities: {
        run: [],
        ride: []
    },
    // activities: {
    //     // ACTIVITY DATA IS FROM STRAVA WITH EXTRA INFORMATION ADDED
    //     run: [
    //         // {
    //         //    activity: BOOL false is no activity
    //         //     ...stravaInfo,
    //         //     dayOfYear : INT
    //         //    yearEddington,
    //         //    overallEddington
    //         //    rolling3, 7, 14, 30
    //         //     target distance,
    //         //     ran distance
    //         //     remaining distance
    //         //     daily remaining days
    //         //      daily remaining distance
    //         // }
    //     ],
    //     ride: {
    //         activities: []
    //     }
    // },
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
        case "LOADING_ACTIVITIES_START":
            return { ...state, dirty: true };
        case "PROCESSING_DATA_END":
            return { ...state, dirty: false, ...action.payload };
        default:
            return state;
    }
};
