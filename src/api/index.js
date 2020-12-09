import axios from "axios";

export const tokenClient = axios.create({
    baseURL: "https://www.strava.com/oauth",
    timeout: 3000
});

export const netlifyClient = axios.create({
    baseURL: "/.netlify/functions",
    timeout: 3000
});

const apiClient = axios.create({
    baseURL: "https://www.strava.com/api/v3",
    timeout: 3000
});

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

export { apiClient };
