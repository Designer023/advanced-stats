import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";

import auth from "./auth";
import athlete from "./athlete";
import app from "./app";
import processedData from "./processedData";
import user from "./user";

export default (history) =>
    combineReducers({
        router: connectRouter(history),
        form: formReducer,
        app,
        auth,
        athlete,
        processedData,
        user
    });
