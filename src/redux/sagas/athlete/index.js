import { call, put, takeEvery } from "redux-saga/effects";
import { apiClient } from "../../../api";
import { validateAuthTokens } from "../auth";

const getAthlete = () => {
    return apiClient({
        url: `/athlete`,
        method: "get"
    }).then((response) => {
        // Dispatch process authentication
        return response;
    });
};

function* getAthleteDetails() {
    yield put({ type: "LOADING_START" });
    yield call(validateAuthTokens);

    yield put({ type: "LOADING_ATHLETE_DETAILS_START" });
    const { data } = yield call(getAthlete);
    yield put({ type: "LOADING_ATHLETE_DETAILS_COMPLETE", payload: data });

    yield put({ type: "LOADING_END" });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchGetAtheleteDetailsAsync() {
    yield takeEvery("GET_ATHLETE_DETAILS", getAthleteDetails);
}
