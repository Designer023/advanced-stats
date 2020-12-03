import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import App from "./App";

import { store, history } from "./configureStore";

// eslint-disable-next-line no-undef
const root = document.getElementById("root");

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
    root
);
