import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
    const { isLoading } = useSelector((state) => state.auth);

    return (
        <>
            {isLoading ? (
                <div>
                    <h1>Loading...</h1>
                    <h3>Page is loading</h3>
                </div>
            ) : null}
        </>
    );
};

export default Loading;
