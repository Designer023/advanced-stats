import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../Button";
import { getActivities } from "../../sagas/actions";
// import { getActivities } from "../../redux/actions";

const StravaSync = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <>
            {auth && auth.isAuthenticated ? (
                <>
                    <Button onClick={() => dispatch(getActivities())}>Sync</Button>
                </>
            ) : (
                <h2>Login to sync</h2>
            )}
        </>
    );
};

export default StravaSync;
