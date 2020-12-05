import { useSelector } from "react-redux";
import ActivityDetailTable from "../../components/ActivityDetailTable";

const RideDetailsPage = () => {
    const activities = useSelector((state) => state.athlete.activities);

    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8 text-gray-800">Ride</h1>
            <hr />
            {activities && activities.length ? <ActivityDetailTable activityType="Ride" target={1000000} /> : null}
        </div>
    );
};

export default RideDetailsPage;
