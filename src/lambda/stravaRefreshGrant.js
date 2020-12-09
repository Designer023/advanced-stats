// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

import { config } from "dotenv";
import { tokenClient } from "../api";

config();

const clientSecret = process.env.STRAVA_CLIENT_SECRET;
const clientID = process.env.REACT_APP_STRAVA_CLIENT_ID;

// eslint-disable-next-line import/prefer-default-export,no-unused-vars,consistent-return
export async function handler(event, context) {
    // {
    //     "path": "Path parameter",
    //     "httpMethod": "Incoming request's method name"
    //     "headers": {Incoming request headers}
    //     "queryStringParameters": {query string parameters }
    //     "body": "A JSON string of the request payload."
    //     "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
    // }

    try {
        const { refreshToken } = event.queryStringParameters;

        if (!refreshToken) {
            throw new Error("No refresh token present in query");
        }

        const data = await tokenClient({
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
                throw new Error(error);
            });

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
    }
}
