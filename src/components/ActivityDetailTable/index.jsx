/* eslint-disable no-unused-vars,react/prop-types */
import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import range from "lodash/range";

import { round } from "../Formatters";
import eddingtonValue from "../../utils/eddington";

const tableHeaderClasses = "px-4 py-2 text-grey-600 dark:bg-gray-800";
const tableClasses = "border border-green-500 px-4 py-2 text-gray-900 font-medium bg-green-50 dark:bg-gray-800";
const tableClassesTodo = "border border-grey-800 px-4 py-2 text-gray-900 font-medium text-opacity-25";

const CompletedRow = ({ activity, day, target }) => (
    <tr>
        <td className={tableClasses}>{day}</td>
        <td className={tableClasses}>{activity.name}</td>
        <td className={tableClasses}>{round(activity.distance / 1000)}</td>
        <td className={tableClasses}>{round(activity.moving_time / 60)}</td>
        <td className={tableClasses}>{round(activity.total_elevation_gain)}</td>
        <td className={tableClasses}>{activity.type}</td>
        <td className={tableClasses}>{round(activity.total / 1000)}</td>

        {target ? <th className={tableClasses}>{round(activity.remaining / 1000)}</th> : null}
        {target ? <th className={tableClasses}>{round(activity.remainingPerDay / 1000)}</th> : null}

        <td className={tableClasses}>{activity.eScore}</td>
    </tr>
);

const IncompleteDay = ({ day, target }) => (
    <tr>
        <td className={tableClassesTodo}>{day.day}</td>
        <td className={tableClassesTodo}> {day.name} </td>
        <td className={tableClassesTodo}> - </td>
        <td className={tableClassesTodo}> - </td>
        <td className={tableClassesTodo}> - </td>
        <td className={tableClassesTodo}> - </td>
        <td className={tableClassesTodo}> {round(day.total / 1000)}</td>
        {target ? <th className={tableClassesTodo}> {round(day.remaining / 1000)} </th> : null}
        {target ? <th className={tableClassesTodo}> {round(day.remainingPerDay / 1000)} </th> : null}
        <td className={tableClassesTodo}> - </td>
    </tr>
);

const ActivityDetailTable = ({ activityType, target }) => {
    const activities = useSelector((state) => state.athlete.activities);

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const filteredActivities = activities.filter((activity) => activity.type === activityType);

        let total = 0;
        const eddingtonNumbers = [0];

        const calculatedActivities = filteredActivities.map((item) => {
            const currentDay = moment(item.start_date).dayOfYear();

            total += item.distance;
            const remaining = target - total;
            const remainingPerDay = remaining / (moment(item.start_date).endOf("year").dayOfYear() + 2 - currentDay);

            const d = Math.floor(item.distance / 1000);

            for (let i = 1; i <= d; i += 1) {
                if (typeof eddingtonNumbers[i] === "undefined") {
                    eddingtonNumbers[i] = 1;
                } else {
                    eddingtonNumbers[i] += 1;
                }
            }

            const eScore = eddingtonValue(eddingtonNumbers);

            return {
                ...item,
                total,
                remaining,
                remainingPerDay,
                eScore,
                completed: true
            };
        });

        const lastActivityDay = calculatedActivities.slice(-1)[0];

        const lastDayNum = moment(lastActivityDay.start_date).add(1, "day").dayOfYear();
        const lastDayOfYear = moment(lastActivityDay.start_date).endOf("year").dayOfYear();

        // create an array of day numbers reamining for this year
        const remainingDayNumbers = range(lastDayNum, lastDayOfYear + 1);

        // The distance still to run this year
        const lastRemainingDistance = lastActivityDay.remaining;
        const lastTotalDistance = lastActivityDay.total;

        // let remainingTotal = 0;

        const remainingActivities = remainingDayNumbers.map((num) => {
            const remainingPerDay = lastDayOfYear - num === 0 ? lastRemainingDistance : lastRemainingDistance / (lastDayOfYear + 1 - num);

            return {
                id: `${num}-incomplete`,
                day: num,
                remainingPerDay,
                name: "Todo",
                remaining: lastRemainingDistance,
                total: lastTotalDistance,
                type: "Run",
                completed: false
            };
        });

        setTableData([...calculatedActivities, ...remainingActivities]);
    }, [activities, activityType, target]);

    if (!activities) <h3>No activities</h3>;

    return (
        <table className="table-auto">
            <thead className="sticky top-0">
                <tr>
                    <th className={tableHeaderClasses}>Day</th>
                    <th className={tableHeaderClasses}>Name</th>
                    <th className={tableHeaderClasses}>Distance</th>
                    <th className={tableHeaderClasses}>Time</th>
                    <th className={tableHeaderClasses}>Elevation</th>
                    <th className={tableHeaderClasses}>Type</th>
                    <th className={tableHeaderClasses}>Total</th>
                    {target ? <th className={tableHeaderClasses}>Remaining</th> : null}
                    {target ? <th className={tableHeaderClasses}>Remaining / day</th> : null}
                    <th className={tableHeaderClasses}>
                        <a className="text-pink-500" href="https://en.wikipedia.org/wiki/Arthur_Eddington#Eddington_number_for_cycling" target="_blank" rel="noreferrer noopener">
                            N<sub className="z-10">Edd</sub>
                        </a>
                    </th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((activity) => {
                    const day = moment(activity.start_date).dayOfYear();

                    if (activity.completed) {
                        return <CompletedRow activity={activity} day={day} target={target} key={activity.id} />;
                    }

                    return <IncompleteDay target={target} day={activity} key={activity.id} />;
                })}
            </tbody>
        </table>
    );
};

export default ActivityDetailTable;
