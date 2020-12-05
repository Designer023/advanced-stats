import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../Button";
import { getActivities } from "../../redux/actions/activities";
import { getAthlete } from "../../redux/actions/athlete";

const StravaSync = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <>
            {auth && auth.isAuthenticated ? (
                <>
                    <div className="mt-3">
                        <Button onClick={() => dispatch(getActivities())}>Sync Data</Button>
                    </div>
                    <div className="mt-3">
                        <Button onClick={() => dispatch(getAthlete())}>Sync Athlete</Button>
                    </div>
                </>
            ) : (
                <h2>Login to sync</h2>
            )}
        </>
    );
};

export default StravaSync;
