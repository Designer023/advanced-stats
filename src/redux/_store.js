/* global window */
import { applyMiddleware, compose, createStore } from "redux";

import { routerMiddleware } from "connected-react-router";

import thunkMiddleware from "redux-thunk";

import { createBrowserHistory } from "history";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

export default function configureStore() {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(createRootReducer(history), composeEnhancer(applyMiddleware(routerMiddleware(history), thunkMiddleware)));

    // Hot reloading
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("./reducers", () => {
            store.replaceReducer(createRootReducer(history));
        });
    }

    return store;
}
