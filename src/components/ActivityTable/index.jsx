import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import { Table, TD, TH } from "../Tables";
import { KM, Minutes, Meters } from "../Formatters";

// eslint-disable-next-line react/prop-types
const ActivityTable = ({ activityType }) => {
    const activities = useSelector((state) => state.athlete.activities);

    if (!activities) <h3>No activities</h3>;

    let filtered = activities;

    if (activityType) {
        filtered = activities.filter((activity) => activity.type === activityType);
    }

    filtered = filtered.slice(Math.max(filtered.length - 7, 0));

    return (
        <Table>
            <thead>
                <tr>
                    <TH>Date</TH>
                    <TH>Name</TH>
                    {!activityType ? <TH>Type</TH> : null}
                    <TH>Distance</TH>
                    <TH>Time</TH>
                    <TH>Elevation</TH>
                </tr>
            </thead>
            <tbody>
                {filtered.map((activity) => {
                    return (
                        <tr key={activity.id}>
                            <TD>{moment(activity.start_date).format("Do MMM, YYYY")}</TD>
                            <TD>{activity.name}</TD>
                            {!activityType ? <TD>{activity.type}</TD> : null}
                            <TD>
                                <KM meters={activity.distance} />
                            </TD>
                            <TD>
                                <Minutes seconds={activity.moving_time} />
                            </TD>
                            <TD>
                                <Meters meters={activity.total_elevation_gain} />
                            </TD>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default ActivityTable;
