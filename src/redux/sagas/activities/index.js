import get from "lodash/get";
import moment from "moment";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { apiClient } from "../../../api";
import { validateAuthTokens } from "../auth";

const getActivity = (epoch, page = 1) => {
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
    const initialYear = Number(process.env.REACT_APP_INITIALYEAR || 2019);
    return moment().year(initialYear).startOf("year").unix();
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
                const fromDate = moment(data.slice(-1)[0].start_date).format("Do MMM YYYY");

                page += 1;
                yield put({ type: "SET_LOADING_MESSAGE", payload: `Retrieving activities from ${fromDate}...` });
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
