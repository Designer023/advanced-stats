import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
// import { push } from "connected-react-router";
import { updateAuthTokens } from "../../actions/auth";
import { BEGIN_STRAVA_AUTH, VALIDATE_STRAVA_TOKEN } from "../../constants/auth";

const clientID = process.env.REACT_APP_STRAVA_CLIENT_ID;
// Todo: Migrate to netlify Lambda to keep secure
const clientSecret = process.env.REACT_APP_STRAVA_CLIENT_SECRET;

const tokenClient = axios.create({
    baseURL: "https://www.strava.com/oauth",
    timeout: 3000
});

const updateRefreshToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return tokenClient({
        url: "/token",
        method: "post",
        params: {
            client_id: clientID,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: "refresh_token"
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
    return tokenClient({
        url: "/token",
        method: "post",
        params: {
            client_id: clientID,
            client_secret: clientSecret,
            code,
            grant_type: "authorization_code"
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
    // Todo: Add Loading start
    const data = yield call(apiValidateToken, code);
    yield put(updateAuthTokens(data));
    // Todo: Add Loading end
}

export function* ValidateStravaTokenAsync() {
    yield takeEvery(VALIDATE_STRAVA_TOKEN, validateStravaToken);
}
