import React from "react";
import { useSelector } from "react-redux";
import Button from "../Button";

const clientID = process.env.REACT_APP_STRAVA_CLIENT_ID;

const StravaAuthButton = () => {
    const auth = useSelector((state) => state.auth);

    return (
        <>
            {auth && auth.isAuthenticated ? (
                <Button onClick={() => {}}>Logout</Button>
            ) : (
                <Button
                    onClick={() => {
                        const { origin } = window;
                        window.location.assign(`https://www.strava.com/oauth/authorize?client_id=${clientID}&redirect_uri=${origin}/token&response_type=code&scope=activity:read`);
                    }}
                >
                    Login with Strava
                </Button>
            )}
        </>
    );
};

export default StravaAuthButton;
