import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
    const { isLoading } = useSelector((state) => state.app);

    return (
        <>
            {isLoading ? (
                <div className="absolute top-0 h-screen left-0 w-screen bg-gray-100	z-50">
                    <div className="p-10 h-full w-full">
                        <div className="px-8 py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center	 h-full w-full	">
                            <div>
                                <h3 className="text-2xl text-center text-gray-400">Loading 🌍</h3>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Loading;
