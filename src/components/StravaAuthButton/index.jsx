import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button";

import { beginStravaAuthentication } from "../../sagas/actions/auth";

const StravaAuthButton = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <>
            {auth && auth.isAuthenticated ? (
                <Button onClick={() => {}}>Logout</Button>
            ) : (
                <Button
                    onClick={() => {
                        dispatch(beginStravaAuthentication());
                    }}
                >
                    Login with Strava
                </Button>
            )}
        </>
    );
};

export default StravaAuthButton;
