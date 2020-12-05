const initialState = {
    targets: {
        run: [
            {
                start: "20190101",
                expires: "20191231",
                distance: 1250000 // meters
            },
            {
                start: "20200101",
                expires: "20201231",
                distance: 2500000 // meters
            },
            {
                start: "20210101",
                expires: "20211231",
                distance: 3500000 // meters
            }
        ]
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
