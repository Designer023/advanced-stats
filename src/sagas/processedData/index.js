// eslint-disable-next-line import/prefer-default-export
import { call, put, select, takeEvery } from "redux-saga/effects";
import eddingtonValue from "../../utils/eddington";

const processActiities = (activities) => {
    const activityTypes = ["Run", "Ride"];

    const data = {};
    activityTypes.forEach((type) => {
        const filteredActivity = activities.filter((activity) => activity.type === type);

        const eddingtonNumbers = [0];

        filteredActivity.forEach((fActivity) => {
            // console.log("PROCESS", activity);
            const { distance } = fActivity;
            const d = Math.floor(distance / 1000);

            for (let i = 1; i <= d; i += 1) {
                if (typeof eddingtonNumbers[i] === "undefined") {
                    eddingtonNumbers[i] = 1;
                } else {
                    eddingtonNumbers[i] += 1;
                }
            }

            const score = eddingtonValue(eddingtonNumbers);

            data[type.toLowerCase()] = {
                breakdown: eddingtonNumbers,
                overall: score
            };
        });
    });

    return { eddington: data };
};

const getAllActivities = (state) => {
    return state.athlete.activities;
};

function* updateAthleteActivity() {
    yield put({ type: "PROCESSING_DATA_START" });

    const activities = yield select(getAllActivities);

    const data = yield call(processActiities, activities);

    yield put({ type: "PROCESSING_DATA_END", payload: data });
}
// eslint-disable-next-line import/prefer-default-export
export function* watchProcessDataAsync() {
    yield takeEvery("LOADING_ACTIVITIES_END", updateAthleteActivity);
}
