import { useSelector } from "react-redux";

import ActivityTable from "../../components/ActivityTable";

const HomePage = () => {
    const activities = useSelector((state) => state.athlete.activities);

    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8">Home</h1>
            <hr />
            {activities && activities.length ? (
                <div className="mt-4 mb-6">
                    <h3 className="text-3xl font-semibold mt-4 mb-4">Activities</h3>

                    <ActivityTable activityType="Run" />
                </div>
            ) : (
                <h3>No activities</h3>
            )}
        </div>
    );
};

export default HomePage;
