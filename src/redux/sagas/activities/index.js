import axios from "axios";
import get from "lodash/get";
import moment from "moment";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { validateAuthTokens } from "../auth";

const getActivity = (epoch, page = 1) => {
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
        url: `/athlete/activities?per_page=30&after=${epoch}&page=${page}`,
        method: "get"
    })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            throw err;
        });
};

const getLastActivityTimestamp = (state) => {
    const lastActivity = state.athlete.activities.slice(-1)[0];
    const lastDate = get(lastActivity, "start_date");

    if (lastDate) {
        return moment(lastDate).unix();
    }

    // TODO: set default year as env
    return moment().year(2009).startOf("year").unix();
};

function* updateAthleteActivity() {
    yield put({ type: "SET_LOADING_MESSAGE", payload: `Retrieving activities...` });

    yield put({ type: "LOADING_START" });
    yield put({ type: "LOADING_ACTIVITIES_START" });
    yield call(validateAuthTokens);

    let page = 1;
    const epoch = yield select(getLastActivityTimestamp);
    try {
        while (true) {
            const { data } = yield call(getActivity, epoch, page);

            // Page has no activities - Last page reached
            if (!data.length) {
                break;
            } else {
                yield put({ type: "LOADING_ACTIVITIES_PAGE_COMPLETE", payload: data });
                page += 1;
                yield put({ type: "SET_LOADING_MESSAGE", payload: `Retrieving page ${page}...` });
            }
        }
    } catch (e) {
        yield put({ type: "LOADING_ACTIVITIES_ERROR", message: e.message });
    }
    yield put({ type: "RESET_LOADING_MESSAGE" });
    yield put({ type: "LOADING_ACTIVITIES_END" });
    yield put({ type: "LOADING_END" });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchUpdateAthleteActivitiesAsync() {
    yield takeEvery("GET_ATHLETE_ACTIVITIES", updateAthleteActivity);
}
