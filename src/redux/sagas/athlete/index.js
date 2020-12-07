import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { validateAuthTokens } from "../auth";

const getAthlete = () => {
    const BASE_URL = "https://www.strava.com/api/v3";
    const apiClient = axios.create({ baseURL: BASE_URL });

    apiClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("accessToken");

            if (token) {
                // eslint-disable-next-line no-param-reassign
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

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
