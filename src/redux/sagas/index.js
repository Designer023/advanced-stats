import { all } from "redux-saga/effects";

import { watchUpdateAthleteActivitiesAsync } from "./activities";
import { watchProcessDataAsync } from "./processedData";
import { watchGetAtheleteDetailsAsync } from "./athlete";
import { beginStravaAuthAsync, ValidateStravaTokenAsync, startStravaDeAuthProcess } from "./auth";

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([watchUpdateAthleteActivitiesAsync(), watchProcessDataAsync(), beginStravaAuthAsync(), ValidateStravaTokenAsync(), watchGetAtheleteDetailsAsync(), startStravaDeAuthProcess()]);
}
