// eslint-disable-next-line import/prefer-default-export
import { call, put, select, takeEvery } from "redux-saga/effects";
import moment from "moment";

import eddingtonValue from "../../../utils/eddington";

const processActiities = (activities) => {
    const activityTypes = ["Run", "Ride"];

    const data = {};
    activityTypes.forEach((type) => {
        const filteredActivity = activities.filter((activity) => activity.type === type);

        const eddingtonNumbers = [0];

        const eddingtonYearNumbers = {};

        filteredActivity.forEach((fActivity) => {
            const year = moment(fActivity.start_date).year();

            if (typeof eddingtonYearNumbers[year] === "undefined") {
                eddingtonYearNumbers[year] = {
                    breakdown: [0],
                    score: 0
                };
            }

            const { distance } = fActivity;
            const d = Math.floor(distance / 1000);

            for (let i = 1; i <= d; i += 1) {
                // All time
                if (typeof eddingtonNumbers[i] === "undefined") {
                    eddingtonNumbers[i] = 1;
                } else {
                    eddingtonNumbers[i] += 1;
                }
                // by the year
                if (typeof eddingtonYearNumbers[year].breakdown[i] === "undefined") {
                    eddingtonYearNumbers[year].breakdown[i] = 1;
                } else {
                    eddingtonYearNumbers[year].breakdown[i] += 1;
                }
            }
        });
        const score = eddingtonValue(eddingtonNumbers);

        Object.keys(eddingtonYearNumbers).forEach((y) => {
            const { breakdown } = eddingtonYearNumbers[y];
            eddingtonYearNumbers[y].score = eddingtonValue(breakdown);
        });
        data[type.toLowerCase()] = {
            breakdown: eddingtonNumbers,
            overall: score,
            years: eddingtonYearNumbers
        };
    });

    return { eddington: data };
};

const getAllActivities = (state) => {
    return state.athlete.activities;
};

function* updateAthleteActivity() {
    yield put({ type: "PROCESSING_DATA_START" });
    yield put({ type: "LOADING_START" });
    yield put({ type: "SET_LOADING_MESSAGE", payload: `Processing data...` });

    const activities = yield select(getAllActivities);

    const data = yield call(processActiities, activities);

    yield put({ type: "PROCESSING_DATA_END", payload: data });
    yield put({ type: "RESET_LOADING_MESSAGE" });
    yield put({ type: "LOADING_END" });
}
// eslint-disable-next-line import/prefer-default-export
export function* watchProcessDataAsync() {
    yield takeEvery("LOADING_ACTIVITIES_END", updateAthleteActivity);
}
