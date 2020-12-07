import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Loading = () => {
    const { isLoading, loadingMessage } = useSelector((state) => state.app);
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const icons = ["🌍", "🏃‍♂", "⛰", "🤳", "🌳", "🥵", "⛷", "🥾", "🧠", "👻", "🤖", "🏊‍♀️"];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIconIndex((idx) => {
                let newIndex = idx + 1;
                if (newIndex === icons.length) {
                    newIndex = 0;
                }
                return newIndex;
            });
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="absolute top-0 h-screen left-0 w-screen bg-gray-100	z-50">
                    <div className="p-10 h-full w-full">
                        <div className="px-8 py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center	 h-full w-full	">
                            <div>
                                <h3 className="text-2xl text-center text-gray-400 mb-3">Loading {icons[currentIconIndex]}</h3>
                                <h4 className="text-l text-center text-gray-400">{loadingMessage}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Loading;
