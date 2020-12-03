import unionBy from "lodash/unionBy";

const initialState = {
    details: null,
    stats: null,
    activities: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        // case "UPDATE_ATHLETE":
        //     return { ...state, details: action.data };
        //
        // case "UPDATE_ATHLETE_STATS":
        //     return { ...state, stats: action.data };

        case "UPDATE_ATHLETE_ACTIVITIES":
            // console.log("UPDATE_ATHLETE_ACTIVITIES", action.payload);
            // eslint-disable-next-line no-case-declarations
            // const activities = new Set();
            // activities.add(...state.payload);
            // activities.add(...action.payload);
            // console.log(action.payload);

            // eslint-disable-next-line no-case-declarations
            const activities = unionBy(state.activities, action.payload, "id");

            return { ...state, activities };

        default:
            return state;
    }
};
