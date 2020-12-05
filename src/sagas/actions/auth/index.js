export const BEGIN_STRAVA_AUTH = "BEGIN_STRAVA_AUTH";
export const VALIDATE_STRAVA_TOKEN = "VALIDATE_STRAVA_TOKEN";
export const UPDATE_AUTH_TOKENS = "UPDATE_AUTH_TOKENS";

export const beginStravaAuthentication = () => ({
    type: BEGIN_STRAVA_AUTH
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
