import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import moment from "moment";
import ActivityDetailTable from "../../components/ActivityDetailTable";

const RunDetailsPage = () => {
    const activities = useSelector((state) => state.athlete.activities);
    const targets = useSelector((state) => state.user.targets.run);

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8 text-gray-800">Run</h1>
            <hr />

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                {targets.map(({ start, expires, distance }) => {
                    const startDate = moment(start, "YYYYMMDD").format("DD/MM/YYYY");
                    return (
                        <div>
                            <input name="example" defaultValue={startDate} ref={register} />
                            <input name="example" defaultValue={expires} ref={register} />
                            <input name="example" defaultValue={distance} ref={register} />
                        </div>
                    );
                })}
                <hr />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" />
            </form>

            {activities && activities.length ? <ActivityDetailTable activityType="Run" target={3000000} /> : null}
        </div>
    );
};

export default RunDetailsPage;
