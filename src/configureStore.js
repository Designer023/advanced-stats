import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import throttle from "lodash/throttle";
import createRootReducer from "./redux/reducers";
import { loadState, saveState } from "./localStorage";

// import appMiddleware from "./redux/middleware/app";

import { helloSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const persistedState = loadState();

// eslint-disable-next-line no-unused-vars
function configureStore(preloadedState) {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(createRootReducer(history), persistedState, composeEnhancer(applyMiddleware(routerMiddleware(history), thunk, sagaMiddleware)));

    sagaMiddleware.run(helloSaga);

    store.subscribe(
        throttle(() => {
            saveState({
                auth: store.getState().auth,
                athlete: store.getState().athlete
            });
        }, 1000)
    );

    // Hot reloading
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("./redux/reducers", () => {
            store.replaceReducer(createRootReducer(history));
        });
    }

    return store;
}

export const store = configureStore();
