import { BEGIN_STRAVA_AUTH, VALIDATE_STRAVA_TOKEN, UPDATE_AUTH_TOKENS, AUTH_START_LOG_OUT } from "../../constants/auth";

export const beginStravaAuthentication = () => ({
    type: BEGIN_STRAVA_AUTH
});

export const beginStravaDeauthentication = () => ({
    type: AUTH_START_LOG_OUT
});

export const validateStravaToken = (code) => ({
    type: VALIDATE_STRAVA_TOKEN,
    payload: code
});

export const updateAuthTokens = ({ refresh_token: refreshToken, expires_at: expiresAt, access_token: accessToken }) => ({
    type: UPDATE_AUTH_TOKENS,
    payload: {
        isAuthenticated: true,
        refreshToken,
        expiresAt,
        accessToken
    }
});
