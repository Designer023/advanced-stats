import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const tableHeaderClasses = "px-4 py-2 text-grey-600 dark:bg-gray-800";
const tableClasses = "border border-grey-500 px-4 py-2 text-gray-900 font-medium bg-green-50 dark:bg-gray-800";
// const tableClassesTodo = "border border-grey-500 px-4 py-2 text-gray-900 font-medium text-opacity-25";

const round = (num) => {
    return Math.round(num * 100 + Number.EPSILON) / 100;
};

// eslint-disable-next-line react/prop-types
const ActivityTable = ({ activityType }) => {
    const activities = useSelector((state) => state.athlete.activities);

    if (!activities) <h3>No activities</h3>;

    let filtered = activities;

    if (activityType) {
        filtered = activities.filter((activity) => activity.type === activityType);
    }

    const cumulative = useMemo(() => {
        let total = 0;

        return filtered.map((item) => {
            const currentDay = moment(item.start_date).dayOfYear();

            total += item.distance;

            return {
                ...item,
                total,
                currentDay
            };
        });
    }, [filtered]);

    // const lastActivityDay = cumulative.slice(-1)[0];
    //
    // const lastDayNum = moment(lastActivityDay.start_date).dayOfYear();
    // const lastDayOfYear = moment(lastActivityDay.start_date).endOf("year").dayOfYear();
    //
    // // create an array of day numbers reamining for this year
    // const remainingDayNumbers = range(lastDayNum, lastDayOfYear + 1);
    //
    // // The distance still to run this year
    // const lastRemainingDistance = lastActivityDay.remaining;
    // const lastTotalDistance = lastActivityDay.total;
    //
    // // let remainingTotal = 0;
    //
    // const remainingDays = remainingDayNumbers.map((num) => {
    //     const remainingPerDay = lastDayOfYear - num === 0 ? lastRemainingDistance : lastRemainingDistance / (lastDayOfYear + 1 - num);
    //
    //     return {
    //         day: num,
    //         remainingPerDay,
    //         name: "Todo",
    //         remaining: lastRemainingDistance,
    //         total: lastTotalDistance,
    //         type: "Run"
    //     };
    // });

    return (
        <table className="table-auto">
            <thead>
                <tr>
                    <th className={tableHeaderClasses}>Day</th>
                    <th className={tableHeaderClasses}>Name</th>
                    <th className={tableHeaderClasses}>Distance</th>
                    <th className={tableHeaderClasses}>Time</th>
                    <th className={tableHeaderClasses}>Elevation</th>
                    <th className={tableHeaderClasses}>Total</th>
                </tr>
            </thead>
            <tbody>
                {cumulative.map((activity) => {
                    return (
                        <tr key={activity.id}>
                            <td className={tableClasses}>{activity.currentDay}</td>
                            <td className={tableClasses}>{activity.name}</td>
                            <td className={tableClasses}>{round(activity.distance / 1000)}</td>
                            <td className={tableClasses}>{round(activity.moving_time / 60)}</td>
                            <td className={tableClasses}>{round(activity.total_elevation_gain)}</td>
                            {/* <td className={tableClasses}>{activity.type}</td> */}
                            <td className={tableClasses}>{round(activity.total / 1000)}</td>
                        </tr>
                    );
                })}

                {/* {remainingDays.map((day) => { */}
                {/*    // const day = moment(activity.start_date).dayOfYear(); */}

                {/*    return ( */}
                {/*        <tr key={day.day}> */}
                {/*            <td className={tableClassesTodo}>{day.day}</td> */}
                {/*            <td className={tableClassesTodo}> {day.name} </td> */}
                {/*            <td className={tableClassesTodo}> - </td> */}
                {/*            <td className={tableClassesTodo}> - </td> */}
                {/*            <td className={tableClassesTodo}> - </td> */}
                {/*            <td className={tableClassesTodo}> - </td> */}
                {/*            <td className={tableClassesTodo}> {round(day.total / 1000)}</td> */}
                {/*            {target ? <th className={tableClassesTodo}> {round(day.remaining / 1000)} </th> : null} */}
                {/*            {target ? <th className={tableClassesTodo}> {round(day.remainingPerDay / 1000)} </th> : null} */}
                {/*        </tr> */}
                {/*    ); */}
                {/* })} */}
            </tbody>
        </table>
    );
};

export default ActivityTable;
