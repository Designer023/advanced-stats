import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import debounce from "lodash/debounce";
import createRootReducer from "./redux/reducers";
import { loadState, saveState } from "./localStorage";

// import appMiddleware from "./redux/middleware/app";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const persistedState = loadState();

// eslint-disable-next-line no-unused-vars
function configureStore() {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(createRootReducer(history), persistedState, composeEnhancer(applyMiddleware(routerMiddleware(history), thunk, sagaMiddleware)));

    sagaMiddleware.run(rootSaga);

    store.subscribe(
        debounce(() => {
            saveState({
                auth: store.getState().auth,
                athlete: store.getState().athlete,
                processedData: store.getState().processedData
            });
        }, 5000)
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
