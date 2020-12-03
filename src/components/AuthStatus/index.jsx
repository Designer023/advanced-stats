import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AuthStatus = () => {
    const [tokenValid, setTokenValid] = useState(false);
    const [time, setTime] = useState(0);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const interval = setInterval(() => {
            const expiresAt = localStorage.getItem("expiresAt");
            const now = Math.floor(Date.now() / 1000);
            setTime(now - expiresAt);
            setTokenValid(now < expiresAt);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-sm text-gray-700">
            <div>Auth: {auth ? "☑️" : "❌"}</div>
            <div>
                Token: {tokenValid ? "☑️" : "❌"} {time}
            </div>
        </div>
    );
};

export default AuthStatus;
