import { useSelector } from "react-redux";
import moment from "moment";
import { Fragment, useState } from "react";

import { Table, TD, TH } from "../../components/Tables";
import Button from "../../components/Button";

import { KM } from "../../components/Formatters";

import BarChart from "../../components/Graph/Charts/Bar";
import LineChart from "../../components/Graph/Charts/Line";
import Graph from "../../components/Graph";
import MultiPlot from "../../components/Graph/MultiPlot";

const DISPLAY = {
    GRAPH: "GRAPH",
    TABLE: "TABLE"
};

const RunDetailsPage = () => {
    const { years } = useSelector((state) => state.processedData.activities.run);
    const currentYear = moment().year();
    const [tab, setTab] = useState(currentYear);
    const [display, setDisplay] = useState(DISPLAY.GRAPH);

    const [displayDaysWithoutActivity, setDisplayDaysWithoutActivity] = useState(false);

    const today = moment().startOf("day");

    if (!years) return null;
    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8 text-gray-800">Run</h1>
            <hr className="my-2" />
            <Button color="green" type="button" onClick={() => setDisplayDaysWithoutActivity(!displayDaysWithoutActivity)}>
                {displayDaysWithoutActivity ? "Hide empty days" : "Show all days"}
            </Button>

            <hr className="my-2" />
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
                .map(({ year, days, total }) => (
                    <Fragment key={year}>
                        <h2 className="text-3xl font-semibold mt-8 mb-4 text-gray-800">{year}</h2>
                        <h3 className="text-2xl mt-2 mb-2 text-gray-800">{days.length} activities</h3>
                        <h3 className="text-2xl mt-2 mb-2 text-gray-800">
                            <KM meters={total} />
                            KM covered
                        </h3>

                        <hr className="my-2" />
                        <Button color="blue" type="button" onClick={() => setDisplay(display === DISPLAY.GRAPH ? DISPLAY.TABLE : DISPLAY.GRAPH)}>
                            {display === DISPLAY.GRAPH ? "Data table" : "Graphs"}
                        </Button>

                        <hr className="my-2" />

                        {display === DISPLAY.GRAPH ? (
                            <>
                                <h3>Per day</h3>
                                <Graph
                                    chartComponent={BarChart}
                                    data={days.map((day) => {
                                        return { y: day.total, x: day.date };
                                    })}
                                    theme={{
                                        color: "#35cb6c"
                                    }}
                                />

                                <h3>Rolling averages </h3>

                                <MultiPlot
                                    xDataType="date"
                                    min={0}
                                    data={[
                                        {
                                            chartComponent: LineChart,
                                            data: days.map((day) => {
                                                return { y: day.ra30, x: day.date };
                                            }),
                                            theme: {
                                                color: "#f3cb4f"
                                            },
                                            label: "RA30"
                                        },
                                        {
                                            chartComponent: LineChart,
                                            data: days.map((day) => {
                                                return { y: day.ra7, x: day.date };
                                            }),
                                            theme: {
                                                color: "#e92088"
                                            },
                                            label: "RA7"
                                        }
                                    ]}
                                />

                                <h3>Needed per day</h3>
                                <Graph
                                    chartComponent={BarChart}
                                    theme={{
                                        color: "#3c3c3c"
                                    }}
                                    data={days.map((day) => {
                                        return { y: day.requiredPerDay, x: day.date };
                                    })}
                                    // max={12000}
                                    min={5000}
                                    max={13000}
                                />
                                <h3>Left to complete</h3>
                                <Graph
                                    theme={{
                                        color: "#b3b3b3"
                                    }}
                                    data={days.map((day) => {
                                        return { y: day.remainingYearTarget, x: day.date };
                                    })}
                                />
                            </>
                        ) : (
                            <>
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
                        )}
                    </Fragment>
                ))}
        </div>
    );
};

export default RunDetailsPage;
