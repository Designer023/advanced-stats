import { useSelector } from "react-redux";
import moment from "moment";
import { Fragment, useState } from "react";
// import ActivityDetailTable from "../../components/ActivityDetailTable";
const tableHeaderClasses = "px-4 py-2 text-grey-600 dark:bg-green-800 dark:text-grey-100";
const tableClasses = "border border-green-500 px-4 py-2 text-gray-900 font-medium bg-green-50 dark:bg-green-600 align-top";
const tableClassesTodo = "border border-grey-800 px-4 py-2 text-gray-900 font-medium text-opacity-25 h-5 align-top dark:bg-grey-700:text-grey-200";

const round = (num) => {
    return Math.round(num * 100 + Number.EPSILON) / 100;
};

// eslint-disable-next-line react/prop-types
const KM = ({ meters }) => {
    return <>{round(meters / 1000)}</>;
};
const RunDetailsPage = () => {
    const { years, total } = useSelector((state) => state.processedData.activities.run);
    const currentYear = moment().year();
    const [tab, setTab] = useState(currentYear);

    console.log(years, total);
    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8 text-gray-800">Run</h1>
            <hr />
            {/* {activities && activities.length ? <ActivityDetailTable activityType="Run" target={3000000} /> : null} */}

            <nav className="flex flex-col sm:flex-row">
                {Object.values(years).map(({ year }) => (
                    <Fragment key={year}>
                        <button onClick={() => setTab(year)} type="button" className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${tab === year ? "text-blue-500 border-b-2 font-medium border-blue-500" : ""}`}>
                            {year} {year === currentYear ? "⭐️" : null}
                        </button>
                    </Fragment>
                ))}
            </nav>

            {Object.values(years)
                .filter((item) => item.year === tab)
                .map(({ year, days }) => (
                    <Fragment key={year}>
                        <h2 className="text-3xl font-semibold mt-8 mb-4 text-gray-800">{year}</h2>
                        <table className="w-full mt-2 mb-8">
                            <thead>
                                <tr>
                                    <th className={tableHeaderClasses}>Date</th>
                                    <th className={tableHeaderClasses}>DoY</th>
                                    <th className={tableHeaderClasses}>Activities</th>
                                    <th className={tableHeaderClasses}>Distance</th>
                                    <th className={tableHeaderClasses}>Elevation</th>

                                    <th className={tableHeaderClasses}>Day distance</th>
                                    <th className={tableHeaderClasses}>Year cumulative Distance</th>
                                    <th className={tableHeaderClasses}>Total cumulative Distance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {days.map((day) => {
                                        if (!day.activities.length) {
                                            return (
                                                <tr key={day.date}>
                                                    <td className={tableClassesTodo}>{moment(day.date).format("ddd, Do MMM")}</td>
                                                    <td className={tableClassesTodo}>{day.day}</td>
                                                    <td className={tableClassesTodo}>-</td>
                                                    <td className={tableClassesTodo}>-</td>
                                                    <td className={tableClassesTodo}>-</td>
                                                </tr>
                                            );
                                        }

                                        return (
                                            <Fragment key={day.date}>
                                                {day.activities.map((activity, i) => (
                                                    <tr key={activity.upload_id}>
                                                        {i === 0 ? (
                                                            <>
                                                                <td className={tableClasses} rowSpan={day.activities.length}>
                                                                    {moment(day.date).format("ddd, Do MMM")}
                                                                </td>
                                                                <td className={tableClasses} rowSpan={day.activities.length}>
                                                                    {day.day}
                                                                </td>
                                                            </>
                                                        ) : null}
                                                        <td className={tableClasses}>{activity.name}</td>
                                                        <td className={tableClasses}>
                                                            <KM meters={activity.distance} />
                                                        </td>
                                                        <td className={tableClasses}>{activity.total_elevation_gain}</td>
                                                        {i === 0 ? (
                                                            <>
                                                                <td className={tableClasses} rowSpan={day.activities.length}>
                                                                    <KM meters={day.total} />
                                                                </td>
                                                                <td className={tableClasses} rowSpan={day.activities.length}>
                                                                    -
                                                                </td>
                                                                <td className={tableClasses} rowSpan={day.activities.length}>
                                                                    -
                                                                </td>
                                                            </>
                                                        ) : null}
                                                    </tr>
                                                ))}
                                            </Fragment>
                                        );
                                    })}
                                </>
                            </tbody>
                        </table>
                    </Fragment>
                ))}
        </div>
    );
};

export default RunDetailsPage;
