import { call, put, takeEvery, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import { tokenClient, netlifyClient } from "../../../api";
import { updateAuthTokens } from "../../actions/auth";
import { BEGIN_STRAVA_AUTH, VALIDATE_STRAVA_TOKEN } from "../../constants/auth";
import { getAthlete } from "../../actions/athlete";

const clientID = process.env.REACT_APP_STRAVA_CLIENT_ID;

const updateRefreshToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return netlifyClient({
        url: "/stravaRefreshGrant",
        method: "post",
        params: {
            refreshToken
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            Promise.reject(error);
        });
};

const tokenIsValid = () => {
    const expiresAt = localStorage.getItem("expiresAt");
    const now = Math.floor(Date.now() / 1000);

    return now < expiresAt;
};

export function* validateAuthTokens() {
    const validToken = yield call(tokenIsValid);

    if (!validToken) {
        yield put({ type: "UPDATE_TOKEN_STARTED" });
        // eslint-disable-next-line camelcase
        const { refresh_token, expires_at, access_token } = yield call(updateRefreshToken);
        yield put({
            type: "UPDATE_AUTH_TOKENS",
            payload: {
                isAuthenticated: true,
                refreshToken: refresh_token,
                expiresAt: expires_at,
                accessToken: access_token
            }
        });
    }
}

const deauthorise = (accessToken) => {
    return tokenClient({
        url: "/deauthorize",
        method: "post",
        params: {
            access_token: accessToken
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            Promise.reject(error);
        });
};

const getAccessToken = (state) => {
    return state.auth.accessToken;
};

function* beginDeAuth() {
    yield put({ type: "LOADING_START" });
    const accessToken = yield select(getAccessToken);
    const data = yield call(deauthorise, accessToken);
    yield put({ type: "AUTH_LOGGED_OUT", payload: data });
    yield put(push("/"));
    yield put({ type: "LOADING_END" });
}

export function* startStravaDeAuthProcess() {
    yield takeEvery("AUTH_START_LOG_OUT", beginDeAuth);
}

function handOffToStravaAuth() {
    const { origin } = window;
    window.location.assign(`https://www.strava.com/oauth/authorize?client_id=${clientID}&redirect_uri=${origin}/token&response_type=code&scope=activity:read`);
}

function* beginStravaAuthentication() {
    yield call(handOffToStravaAuth);
}

export function* beginStravaAuthAsync() {
    yield takeEvery(BEGIN_STRAVA_AUTH, beginStravaAuthentication);
}

const apiValidateToken = (code) => {
    return netlifyClient({
        url: "/stravaAuth",
        method: "post",
        params: {
            code
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            Promise.reject(error);
        });
};

function* validateStravaToken({ payload: code }) {
    yield put({ type: "LOADING_START" });
    const data = yield call(apiValidateToken, code);
    yield put(updateAuthTokens(data));
    yield put(push("/"));
    yield put(getAthlete());
    yield put({ type: "LOADING_END" });
}

export function* ValidateStravaTokenAsync() {
    yield takeEvery(VALIDATE_STRAVA_TOKEN, validateStravaToken);
}
