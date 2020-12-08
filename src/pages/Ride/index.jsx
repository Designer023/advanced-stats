import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
import moment from "moment";
import { Table, TD, TH } from "../../components/Tables";

import { KM } from "../../components/Formatters";

const RideDetailsPage = () => {
    const { years } = useSelector((state) => state.processedData.activities.ride);
    const currentYear = moment().year();
    const [tab, setTab] = useState(currentYear);

    if (!years) return null;
    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8 text-gray-800">Ride</h1>
            <hr />

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
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {days.map((day) => {
                                        if (!day.activities.length) {
                                            return (
                                                <tr key={day.date}>
                                                    <TD muted>{moment(day.date).format("ddd, Do MMM")}</TD>
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
                    </Fragment>
                ))}
        </div>
    );
};

export default RideDetailsPage;
