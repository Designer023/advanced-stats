import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
    const { isLoading } = useSelector((state) => state.app);

    return (
        <>
            {isLoading ? (
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-100	z-50 flex justify-content-center">
                    <div>
                        <h1>Loading...</h1>
                        <h3>Page is loading</h3>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Loading;
