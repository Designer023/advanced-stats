/* eslint-disable no-undef,react/prop-types */
import moment from "moment";
import { Fragment, useState } from "react";
import { Table, TD, TH } from "../Tables";
import { KM } from "../Formatters";
import Button from "../Button";

const DetailTable = ({ days }) => {
    const [displayDaysWithoutActivity, setDisplayDaysWithoutActivity] = useState(false);
    const today = moment().startOf("day");

    return (
        <>
            <Button color="green" type="button" onClick={() => setDisplayDaysWithoutActivity(!displayDaysWithoutActivity)}>
                {displayDaysWithoutActivity ? "Hide empty days" : "Show all days"}
            </Button>

            <hr className="my-2" />
            <Table>
                <thead>
                    <tr>
                        <TH>Date</TH>
                        <TH>DoY</TH>
                        <TH>Activities</TH>
                        <TH>Distance</TH>
                        <TH>Elevation</TH>

                        <TH>Day distance</TH>
                        <TH>Year cumulative Distance</TH>
                        <TH>Total cumulative Distance</TH>
                        <TH>Remaining</TH>
                        <TH>Needed per day</TH>
                        <TH muted>RA 30</TH>
                        <TH muted>RA 7</TH>
                    </tr>
                </thead>
                <tbody>
                    <>
                        {days.map((day) => {
                            if (!day.activities.length) {
                                const date = moment(day.date);
                                const isFuture = today.isBefore(date.clone().add(1, "day"));
                                if (!displayDaysWithoutActivity && !isFuture) return null;
                                return (
                                    <tr key={day.date}>
                                        <TD muted>{date.format("ddd, Do MMM")}</TD>
                                        <TD muted>{day.day}</TD>
                                        <TD muted>-</TD>
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
                                        <TD muted>
                                            <KM meters={day.ra30} />
                                        </TD>
                                        <TD muted>
                                            <KM meters={day.ra7} />
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
                                                    <TD rowSpan={day.activities.length}>{moment(day.date).format("ddd, Do MMM")}</TD>
                                                    <TD rowSpan={day.activities.length}>{day.day}</TD>
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
                                                        <KM meters={day.totalCumulative} />
                                                    </TD>

                                                    <TD rowSpan={day.activities.length}>
                                                        <KM meters={day.remainingYearTarget} />
                                                    </TD>
                                                    <TD rowSpan={day.activities.length}>
                                                        <KM meters={day.requiredPerDay} />
                                                    </TD>
                                                    <TD rowSpan={day.activities.length}>
                                                        <KM meters={day.ra30} />
                                                    </TD>
                                                    <TD rowSpan={day.activities.length}>
                                                        <KM meters={day.ra7} />
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
