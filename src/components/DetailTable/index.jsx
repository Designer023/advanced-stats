/* eslint-disable no-undef,react/prop-types */
import moment from "moment";
import { Fragment, useState } from "react";
import { Table, TD, TH } from "../Tables";
import { KM } from "../Formatters";
import Button from "../Button";

const DetailTable = ({ days }) => {
    const [displayDaysWithoutActivity, setDisplayDaysWithoutActivity] = useState(false);
    const [displayFutureDays, setDisplayFutureDays] = useState(false);

    const today = moment().startOf("day");

    return (
        <>
            <Button color="green" type="button" onClick={() => setDisplayDaysWithoutActivity(!displayDaysWithoutActivity)}>
                {displayDaysWithoutActivity ? "Hide empty days" : "Show empty days"}
            </Button>

            <Button color="green" type="button" onClick={() => setDisplayFutureDays(!displayFutureDays)}>
                {displayFutureDays ? "Hide future days" : "Show all days"}
            </Button>

            <hr className="my-2" />

            <Table>
                <thead>
                    <tr>
                        <TH>Date</TH>
                        <TH>Activities</TH>
                        <TH>Distance</TH>
                        <TH>Elevation</TH>

                        <TH>Day distance</TH>
                        <TH>Year cumulative Distance</TH>
                        <TH>Remaining</TH>
                        <TH>Needed per day</TH>
                    </tr>
                </thead>
                <tbody>
                    <>
                        {days.map((day) => {
                            const date = moment(day.date);
                            const isFuture = today.isBefore(date.clone().add(1, "day"));
                            const isToday = today.isSame(date, "day");

                            if (!day.activities.length) {
                                if (!displayDaysWithoutActivity && !isFuture) return null;
                                if (!displayFutureDays && isFuture) return null;
                                return (
                                    <tr key={day.date}>
                                        <TD muted>{date.format("ddd, Do MMM")}</TD>
                                        <TD muted>-</TD>
                                        <TD muted>-</TD>
                                        <TD muted>-</TD>
                                        <TD muted>-</TD>
                                        <TD muted>-</TD>
                                        <TD muted>
                                            <KM meters={day.remainingYearTarget} />
                                        </TD>
                                        <TD muted>
                                            <KM meters={day.requiredPerDay} />
                                        </TD>
                                    </tr>
                                );
                            }

                            return (
                                <Fragment key={day.date}>
                                    {day.activities.map((activity, i) => (
                                        <tr key={activity.upload_id}>
                                            {i === 0 ? (
                                                <>
                                                    <TD rowSpan={day.activities.length}>
                                                        {moment(day.date).format("ddd, Do MMM")} {isToday ? <span>🖐</span> : null}
                                                    </TD>
                                                </>
                                            ) : null}
                                            <TD>{activity.name}</TD>
                                            <TD>
                                                <KM meters={activity.distance} />
                                            </TD>
                                            <TD>{activity.total_elevation_gain}</TD>
                                            {i === 0 ? (
                                                <>
                                                    <TD rowSpan={day.activities.length}>
                                                        <KM meters={day.total} />
                                                    </TD>
                                                    <TD rowSpan={day.activities.length}>
                                                        <KM meters={day.yearCumulative} />
                                                    </TD>

                                                    <TD rowSpan={day.activities.length}>
                                                        <KM meters={day.remainingYearTarget} />
                                                    </TD>
                                                    <TD rowSpan={day.activities.length}>
                                                        <KM meters={day.requiredPerDay} />
                                                    </TD>
                                                </>
                                            ) : null}
                                        </tr>
                                    ))}
                                </Fragment>
                            );
                        })}
                    </>
                </tbody>
            </Table>
        </>
    );
};

export default DetailTable;
