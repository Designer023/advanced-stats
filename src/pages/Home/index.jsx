import { useSelector } from "react-redux";

import ActivityTable from "../../components/ActivityTable";

const HomePage = () => {
    const activities = useSelector((state) => state.athlete.activities);
    const loading = useSelector((state) => state.athlete.loading);

    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8 text-gray-800">Home</h1>
            <hr />
            {activities && activities.length ? (
                <div className="mt-4 mb-6">
                    <h3 className="text-3xl font-semibold mt-4 mb-4 text-gray-600">Latest</h3>

                    {loading ? (
                        <div className="px-8 py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300	">
                            <h3 className="text-2xl text-center text-gray-400">Loading data</h3>
                        </div>
                    ) : (
                        <ActivityTable activityType="Run" />
                    )}
                </div>
            ) : (
                <h3>No activities</h3>
            )}
        </div>
    );
};

export default HomePage;
