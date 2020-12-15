import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";

import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import App from "./App";

import storeConfig, { history } from "./configureStore";

const { store, persistor } = storeConfig;
// eslint-disable-next-line no-undef
const root = document.getElementById("root");

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    root
);
