import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import localForage from "localforage";

// import debounce from "lodash/debounce";
import createRootReducer from "./redux/reducers";
// import { loadState, saveState } from "./persistance/localStorage";

// import appMiddleware from "./redux/middleware/app";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const configureStore = (initialState = {}) => {
    const enhancers = [];
    // eslint-disable-next-line no-underscore-dangle
    const __DEV__ = process.env.NODE_ENV !== "production";
    if (__DEV__) {
        const { devToolsExtension } = window;
        if (typeof devToolsExtension === "function") {
            enhancers.push(devToolsExtension());
        }
    }

    const middleware = [routerMiddleware(history), sagaMiddleware];
    const rootReducer = createRootReducer(history);

    const config = {
        key: "root",
        storage: localForage,
        whitelist: ["auth", "athlete", "processedData"],
        debug: __DEV__
    };

    const configureReducer = persistReducer(config, rootReducer);
    const store = createStore(configureReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));

    sagaMiddleware.run(rootSaga);

    const persistor = persistStore(store);
    return { store, persistor };
};

export default configureStore();

// const persistedState = loadState();
//
// // eslint-disable-next-line no-unused-vars
// function configureStore() {
//     const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     const store = createStore(createRootReducer(history), persistedState, composeEnhancer(applyMiddleware(routerMiddleware(history), sagaMiddleware)));
//
//     sagaMiddleware.run(rootSaga);
//
//     store.subscribe(
//         debounce(() => {
//             saveState({
//                 auth: store.getState().auth,
//                 athlete: store.getState().athlete,
//                 processedData: store.getState().processedData
//             });
//         }, 5000)
//     );
//
//     // Hot reloading
//     if (module.hot) {
//         // Enable Webpack hot module replacement for reducers
//         module.hot.accept("./redux/reducers", () => {
//             store.replaceReducer(createRootReducer(history));
//         });
//     }
//
//     return store;
// }
//
// export const store = configureStore();
