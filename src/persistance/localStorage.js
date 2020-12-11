export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (e) {
        // ignore write errors
        console.log(e);
    }
};

export const setItem = (key, value) => {
    localStorage.setItem(key, value);
};

export const getItem = (key) => {
    return localStorage.getItem(key);
};

export const removeItem = (key) => {
    return localStorage.removeItem(key);
};
