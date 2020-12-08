import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import { Table, TD, TH } from "../Tables";
import { KM, Minutes, Round } from "../Formatters";

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

    return (
        <Table>
            <thead>
                <tr>
                    <TH>Day</TH>
                    <TH>Name</TH>
                    <TH>Distance</TH>
                    <TH>Time</TH>
                    <TH>Elevation</TH>
                    <TH>Total</TH>
                </tr>
            </thead>
            <tbody>
                {cumulative.map((activity) => {
                    return (
                        <tr key={activity.id}>
                            <TD>{activity.currentDay}</TD>
                            <TD>{activity.name}</TD>
                            <TD>
                                <KM meters={activity.distance} />
                            </TD>
                            <TD>
                                <Minutes seconds={activity.moving_time} />
                            </TD>
                            <TD>
                                <Round value={activity.total_elevation_gain} />
                            </TD>
                            <TD>
                                <KM meters={activity.total} />
                            </TD>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default ActivityTable;
