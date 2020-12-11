import localforage from "localforage";

export const loadState = async () => {
    const state = await localforage
        .getItem("state")
        .then(function (v) {
            // we got our value
            console.log(`${v} loaded`);
            return v;
        })
        .catch(function (err) {
            console.log(`Error setting data:${err}`);
        });

    return state;
};

export const saveState = (state) => {
    try {
        // const serializedState = JSON.stringify(state);
        localforage.setItem("state", state);
    } catch (e) {
        // ignore write errors
        console.log(e);
    }
};

export const setItem = async (key, value) => {
    await localforage
        .setItem(key, value)
        .then(function (v) {
            // we got our value
            console.log(`${v} set`);
        })
        .catch(function (err) {
            console.log(`Error setting data:${err}`);
        });
};

export const getItem = async (key) => {
    return localforage.getItem(key);
};

export const removeItem = (key) => {
    localforage.removeItem(key);
};
