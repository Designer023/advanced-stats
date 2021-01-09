import { useSelector } from "react-redux";

import ActivityTable from "../../components/ActivityTable";

const HomePage = () => {
    const activities = useSelector((state) => state.athlete.activities);
    const { isAuthenticated } = useSelector((state) => state.auth);

    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8 text-gray-800">Home</h1>
            <hr />

            {isAuthenticated ? (
                <>
                    {activities && activities.length ? (
                        <div className="mt-4 mb-6">
                            <h2 className="text-3xl font-semibold mt-4 mb-4 text-gray-600">Latest</h2>

                            <h3 className="text-xl font-semibold mt-4 mb-4 text-gray-600">All</h3>
                            <ActivityTable />

                            <h3 className="text-xl font-semibold mt-4 mb-4 text-gray-600">Running</h3>
                            <ActivityTable activityType="Run" />

                            <hr className="mb-6 mt-2" />

                            <h3 className="text-xl font-semibold mt-4 mb-4 text-gray-600">Ride</h3>
                            <ActivityTable activityType="Ride" />

                            <hr className="mb-6 mt-2" />

                            <h3 className="text-xl font-semibold mt-4 mb-4 text-gray-600">Hike</h3>
                            <ActivityTable activityType="Hike" />

                            <hr className="mb-6 mt-2" />

                            <h3 className="text-xl font-semibold mt-4 mb-4 text-gray-600">Walk</h3>
                            <ActivityTable activityType="Walk" />

                            <hr className="mb-6 mt-2" />
                        </div>
                    ) : (
                        <h3>No activities. Please sync your activities.</h3>
                    )}
                </>
            ) : (
                <div className="bg-yellow-200 px-6 py-4 my-6 rounded-md text-lg flex items-center mx-auto w-3/4 xl:w-2/4">
                    <svg viewBox="0 0 24 24" className="text-yellow-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                        <path
                            fill="currentColor"
                            d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"
                        />
                    </svg>
                    <span className="text-yellow-800">You need to log in to Strava and sync your activities</span>
                </div>
            )}
        </div>
    );
};

export default HomePage;
