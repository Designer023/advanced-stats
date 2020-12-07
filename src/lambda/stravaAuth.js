// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

import axios from "axios";
import { config } from "dotenv";

config();

const clientSecret = process.env.STRAVA_CLIENT_SECRET;
const clientID = process.env.REACT_APP_STRAVA_CLIENT_ID;

const tokenClient = axios.create({
    baseURL: "https://www.strava.com/oauth",
    timeout: 3000
});

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
        const { code } = event.queryStringParameters;

        if (!code) {
            throw new Error("No token present in query");
        }

        const data = await tokenClient({
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
                throw new Error(error);
                // return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
            });

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
    }
}

//
// import fetch from "node-fetch";
// import { config } from "dotenv";
//
// config();
//
// const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
//
// // eslint-disable-next-line import/prefer-default-export
// export async function handler(event, context) {
//     try {
//         const data = await fetch(`https://api.github.com/users/oliverjam?access_token=${TOKEN}`).then((res) => {
//             if (!res.ok) {
//                 const error = new Error("HTTP error");
//                 error.status = res.status;
//                 throw error;
//             }
//             return res.json();
//         });
//         return {
//             statusCode: 200,
//             body: JSON.stringify(data)
//         };
//     } catch (error) {
//         return {
//             statusCode: error.status || 500,
//             body: error.message
//         };
//     }
// }
