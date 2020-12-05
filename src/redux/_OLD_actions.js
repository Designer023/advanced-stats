// /* eslint-disable no-underscore-dangle,consistent-return,no-unused-vars */
// import { push } from "connected-react-router";
// import axios from "axios";
// import get from "lodash/get";
// import moment from "moment";

// const clientID = process.env.REACT_APP_STRAVA_CLIENT_ID;
// const clientSecret = process.env.REACT_APP_STRAVA_CLIENT_SECRET;
//
// const BASE_URL = "https://www.strava.com/api/v3";
//
// const tokenClient = axios.create({
//     baseURL: "https://www.strava.com/oauth",
//     timeout: 3000
// });

// eslint-disable-next-line camelcase
// export const updateAuthTokens = ({ refresh_token, expires_at, access_token }) => {
//     // console.log("UPDATE_AUTH_TOKENS", id);
//     return {
//         type: "UPDATE_AUTH_TOKENS",
//         payload: {
//             isAuthenticated: true,
//             refreshToken: refresh_token,
//             expiresAt: expires_at,
//             accessToken: access_token
//         }
//     };
// };

// eslint-disable-next-line import/prefer-default-export
// export const startAuththentication = (code) => {
//     return (dispatch, getState) => {
//         // dispatch(startLoading());
//         tokenClient({
//             url: "/token",
//             method: "post",
//             params: {
//                 client_id: clientID,
//                 client_secret: clientSecret,
//                 code,
//                 grant_type: "authorization_code"
//             }
//         })
//             .then((response) => {
//                 // Dispatch process authentication
//                 dispatch(updateAuthTokens(response.data));
//                 dispatch(push({ pathname: "/", search: "" }));
//                 // dispatch(endLoading());
//             })
//             .catch((error) => {
//                 console.log("error:", error);
//                 // Dispatch error message
//                 // Dispatch finish waiting room
//                 // dispatch(recieveAuthenticationError());
//             });
//     };
// };
// function getAccessToken() {
//     return localStorage.getItem("accessToken");
// }
//
// // function _getExpiresAt() {
// //     return localStorage.getItem("expiresAt");
// // }
//
// function getRefreshToken() {
//     return localStorage.getItem("refreshToken");
// }
//
// const tokenClient = axios.create({
//     baseURL: "https://www.strava.com/oauth",
//     timeout: 3000
// });
//
const apiClient = axios.create({ baseURL: BASE_URL });
//
// export const startLoading = () => {
//     return {
//         type: "START_LOADING"
//     };
// };
//
// export const endLoading = () => {
//     return {
//         type: "END_LOADING"
//     };
// };
//
// export const errorLoading = () => {
//     return {
//         type: "ERROR_LOADING"
//     };
// };
//
// export const authorize = () => {
//     return {
//         type: "REDIRECT_TO_OAUTH"
//     };
// };
//
// export const recieveAuthenticationError = (data) => {
//     return {
//         type: "UPDATE_AUTH_TOKENS_ERROR",
//         data
//     };
// };
//

// apiClient.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("accessToken");
//
//         if (token) {
//             // eslint-disable-next-line no-param-reassign
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//
//         return config;
//     },
//     (error) => {
//         Promise.reject(error);
//     }
// );

//
// apiClient.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         console.log(error);
//         const originalRequest = error.config;
//
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//
//             store.dispatch(startLoading());
//             tokenClient({
//                 url: "/token",
//                 method: "post",
//                 params: {
//                     client_id: clientID,
//                     client_secret: clientSecret,
//                     refresh_token: getRefreshToken(),
//                     grant_type: "refresh_token"
//                 }
//             }).then((res) => {
//                 console.log("RE AUTH:", res);
//                 if (res.status === 200) {
//                     apiClient.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
//                     // Dispatch process authentication
//                     const athlete = { id: store.getState().auth.athlete_id };
//                     store.dispatch(updateAuthTokens({ ...res.data, athlete }));
//                     store.dispatch(endLoading());
//                     return apiClient(originalRequest);
//                 }
//             });
//         }
//         // return Error object with Promise
//         return Promise.reject(error);
//     }
// );
//
// export const startAuththentication = (code) => {
//     return function (dispatch, getState) {
//         dispatch(startLoading());
//         tokenClient({
//             url: "/token",
//             method: "post",
//             params: {
//                 client_id: clientID,
//                 client_secret: clientSecret,
//                 code,
//                 grant_type: "authorization_code"
//             }
//         })
//             .then((response) => {
//                 console.log(response);
//                 // Dispatch process authentication
//                 dispatch(updateAuthTokens(response.data));
//                 dispatch(push({ pathname: "/", search: "" }));
//                 dispatch(endLoading());
//             })
//             .catch((error) => {
//                 // Dispatch error message
//                 // Dispatch finish waiting room
//                 dispatch(recieveAuthenticationError());
//             });
//     };
// };
//
// export const updateAthleteError = (data) => {
//     return {
//         type: "UPDATE_ATHLETE_ERROR",
//         data
//     };
// };
//
// export const updateAthlete = (data) => {
//     return {
//         type: "UPDATE_ATHLETE",
//         data
//     };
// };
//
// export const getAthleteData = () => {
//     return function (dispatch, getState) {
//         // dispatch(startLoading());
//
//         apiClient({
//             url: "/athlete",
//             method: "get"
//         }).then((response) => {
//             console.log("DATA__:", response);
//             // Dispatch process authentication
//             dispatch(updateAthlete(response.data));
//             // dispatch(endLoading());
//         });
//         // .catch((error) => {
//         //     // Dispatch error message
//         //     // Dispatch finish waiting room
//         //     dispatch(updateAthleteError());
//         // });
//     };
// };

// export const updateStatsError = (data) => {
//     return {
//         type: "UPDATE_STATS_ERROR",
//         data
//     };
// };
//
// export const updateStats = (data) => {
//     return {
//         type: "UPDATE_ATHLETE_STATS",
//         data
//     };
// };
//
// export const getAthleteStats = () => {
//     return function (dispatch, getState) {
//         dispatch(startLoading());
//
//         const id = getState().auth.athlete_id;
//
//         apiClient({
//             url: `/athletes/${id}/stats`,
//             method: "get"
//         }).then((response) => {
//             // Dispatch process authentication
//             dispatch(updateStats(response.data));
//             dispatch(endLoading());
//         });
//         // .catch((error) => {
//         //     // Dispatch error message
//         //     // Dispatch finish waiting room
//         //     dispatch(updateStatsError());
//         // });
//     };
// };
//
// export const updatActivitiesError = (data) => {
//     return {
//         type: "UPDATE_ATHLETE_ACTIVITIES_ERROR",
//         data
//     };
// };
//
// const updateActivities = (data) => {
//     // console.log("UPDATE_ATHLETE_ACTIVITIES...", data);
//     return {
//         type: "UPDATE_ATHLETE_ACTIVITIES",
//         payload: data
//     };
// };
//
// export function getActivities(page = 1) {
//     return function (dispatch, getState) {
//         // dispatch(startLoading());
//
//         const expiresAt = localStorage.getItem("expiresAt");
//         const now = Math.floor(Date.now() / 1000);
//
//         if (now > expiresAt) {
//             // Session token expired -  get a new one
//
//             const refreshToken = localStorage.getItem("refreshToken");
//             tokenClient({
//                 url: "/token",
//                 method: "post",
//                 params: {
//                     client_id: clientID,
//                     client_secret: clientSecret,
//                     refresh_token: refreshToken,
//                     grant_type: "refresh_token"
//                 }
//             })
//                 .then((response) => {
//                     dispatch(updateAuthTokens(response.data));
//                     dispatch(getActivities());
//                 })
//                 .catch((error) => {
//                     console.log("error:", error);
//                 });
//         } else {
//             // Session valid
//
//             // try and get the latest activity
//             const lastActivity = getState().athlete.activities.slice(-1)[0];
//             const lastDate = get(lastActivity, "start_date");
//
//             let epoch;
//             if (lastDate) {
//                 epoch = moment(lastDate).unix();
//             } else {
//                 epoch = new Date(2020, 0, 1).getTime() / 1000; // Month is 0 based WTF!
//             }
//
//             epoch = new Date(2020, 10, 1).getTime() / 1000; // Month is 0 based WTF!
//
//             apiClient({
//                 url: `/athlete/activities?per_page=30&after=${epoch}&page=${page}`,
//                 method: "get"
//             }).then((response) => {
//                 const activities = response.data;
//
//                 if (activities.length > 0) {
//                     // console.log(activities);
//                     dispatch(updateActivities(activities));
//                     dispatch(getActivities(page + 1));
//                 } else {
//                     console.log("done");
//                     // dispatch(endLoading());
//                 }
//             });
//         }
//     };
// }
