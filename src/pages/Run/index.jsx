import { useSelector } from "react-redux";
import ActivityDetailTable from "../../components/ActivityDetailTable";

const RunDetailsPage = () => {
    const activities = useSelector((state) => state.athlete.activities);

    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8">Run</h1>
            <hr />
            {activities && activities.length ? <ActivityDetailTable activityType="Run" target={3000000} /> : null}
        </div>
    );
};

export default RunDetailsPage;
