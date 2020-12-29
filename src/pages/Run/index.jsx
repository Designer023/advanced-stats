/* eslint-disable react/prop-types,no-unused-vars */
import { useSelector } from "react-redux";
import moment from "moment";
import { Fragment, useState, useMemo } from "react";

import { Table, TD, TH } from "../../components/Tables";
import Button from "../../components/Button";

import { KM } from "../../components/Formatters";

import BarChart from "../../components/Graph/Charts/Bar";
import LineChart from "../../components/Graph/Charts/Line";
import Graph from "../../components/Graph";
import MultiPlot from "../../components/Graph/MultiPlot";
import ScatterChart from "../../components/Graph/Charts/Scatter";

import * as DATA_TYPES from "../../components/Graph/constants/dataTypes";

const DISPLAY = {
    GRAPH: "GRAPH",
    TABLE: "TABLE"
};

// eslint-disable-next-line react/prop-types
const GraphDetails = ({ days }) => {
    const today = moment().endOf("day");

    const dailyRuns = useMemo(() => {
        return days.map((day) => {
            return { y: day.total, x: day.date };
        });
    }, [days]);

    const dailyElevation = useMemo(() => {
        return days.map((day) => {
            return { y: day.dayElevation, x: day.date };
        });
    }, [days]);

    const cumulative = useMemo(() => {
        return days.map((day) => {
            return { y: day.yearCumulative, x: day.date };
        });
    }, [days]);

    const cumulativeElevation = useMemo(() => {
        return days.map((day) => {
            return { y: day.yearElevationGain, x: day.date };
        });
    }, [days]);

    const cumulativeTarget = useMemo(() => {
        return days.map((day, i) => {
            return { y: (i * 3000000) / 366, x: day.date };
        });
    }, [days]);

    const rolling30 = useMemo(() => {
        return days
            .filter((d, i) => {
                const date = moment(d.date);
                return date.isSameOrBefore(today) && i >= 30;
            })
            .map((day) => {
                return { y: day.ra30, x: day.date };
            });
    }, [days, today]);

    const rolling7 = useMemo(() => {
        return days
            .filter((d, i) => {
                const date = moment(d.date);
                return date.isSameOrBefore(today) && i >= 7;
            })
            .map((day) => {
                return { y: day.ra7, x: day.date };
            });
    }, [days, today]);

    const requiredDaily = useMemo(() => {
        return days.map((day) => {
            return { y: day.requiredPerDay, x: day.date };
        });
    }, [days]);

    const det = useMemo(() => {
        return days
            .filter((day) => day.activities.length)
            .map((day) => {
                return { x: day.activities[0].distance, y: day.activities[0].total_elevation_gain, z: day.activities[0].moving_time };
            });
    }, [days]);

    const paceDistance = useMemo(() => {
        return days
            .filter((day) => day.activities.length)
            .map((day) => {
                return { x: day.activities[0].average_speed, y: day.activities[0].total_elevation_gain, z: day.activities[0].average_heartrate };
            });
    }, [days]);

    const hr = useMemo(() => {
        return days
            .filter((day) => day.activities.length)
            .map((day) => {
                return { x: day.activities[0].average_heartrate, y: day.activities[0].average_speed };
            });
    }, [days]);

    const elhr = useMemo(() => {
        return days
            .filter((day) => day.activities.length)
            .map((day) => {
                return { x: day.activities[0].average_heartrate, y: day.activities[0].total_elevation_gain };
            });
    }, [days]);

    const chr = useMemo(() => {
        return days
            .filter((day) => day.activities.length)
            .map((day) => {
                return { x: day.activities[0].distance, y: day.activities[0].suffer_score };
            });
    }, [days]);

    return (
        <>
            <MultiPlot
                xDataType={DATA_TYPES.NUMBER}
                yDataType={DATA_TYPES.NUMBER}
                plotData={[
                    {
                        chartComponent: ScatterChart,
                        data: chr,
                        theme: {
                            color: "#35cb6c"
                        },
                        label: "HR vs. Speed"
                    }
                ]}
                yLabel="Distance"
                xLabel="Suffer Score"
                xLabelTransform={(d) => d / 1000}
            />

            <MultiPlot
                xDataType={DATA_TYPES.NUMBER}
                yDataType={DATA_TYPES.NUMBER}
                plotData={[
                    {
                        chartComponent: ScatterChart,
                        data: det,
                        theme: {
                            color: "#25dafa"
                        },
                        label: "Distance Elevation Time"
                    }
                ]}
                yLabel="Distance"
                xLabel="Elevation"
                zLabel="Time"
            />

            <MultiPlot
                xDataType={DATA_TYPES.NUMBER}
                yDataType={DATA_TYPES.NUMBER}
                plotData={[
                    {
                        chartComponent: ScatterChart,
                        data: paceDistance,
                        theme: {
                            color: "#ee368b"
                        },
                        label: "HR vs. Speed"
                    }
                ]}
                yLabel="Speed"
                xLabel="Elevation"
            />

            <MultiPlot
                xDataType={DATA_TYPES.NUMBER}
                yDataType={DATA_TYPES.NUMBER}
                plotData={[
                    {
                        chartComponent: ScatterChart,
                        data: elhr,
                        theme: {
                            color: "#f1b131"
                        },
                        label: "HR vs. Elevation"
                    }
                ]}
                yLabel="Heart Rate"
                xLabel="Elevation"
            />

            <MultiPlot
                xDataType={DATA_TYPES.NUMBER}
                yDataType={DATA_TYPES.NUMBER}
                plotData={[
                    {
                        chartComponent: ScatterChart,
                        data: hr,
                        theme: {
                            color: "#7940e7"
                        },
                        label: "HR vs. Speed"
                    }
                ]}
                yLabel="Heart Rate"
                xLabel="Speed"
            />

            <MultiPlot
                yDataType={DATA_TYPES.NUMBER}
                yUnitScale={0.001}
                xDataType={DATA_TYPES.DATE}
                min={0}
                max={50000}
                yLabel="Date"
                xLabel="Distance"
                plotData={[
                    {
                        chartComponent: BarChart,
                        data: dailyRuns,
                        theme: {
                            color: "#35cb6c"
                        },
                        label: "Activities"
                    },
                    {
                        chartComponent: LineChart,
                        data: rolling7,
                        theme: {
                            color: "#a4467a",
                            opacity: "0.5"
                        },
                        label: "7 day"
                    },
                    {
                        chartComponent: LineChart,
                        data: rolling30,
                        theme: {
                            color: "#e3bbd1",
                            opacity: "0.5"
                        },
                        label: "30 day"
                    },
                    {
                        chartComponent: LineChart,
                        data: requiredDaily,
                        theme: {
                            color: "#ff8029"
                        },
                        label: "Required/day"
                    }
                ]}
                height={400}
            />

            <h3>Per day</h3>

            <MultiPlot
                yUnitScale={0.001}
                yDataType={DATA_TYPES.NUMBER}
                xDataType={DATA_TYPES.DATE}
                min={0}
                plotData={[
                    {
                        chartComponent: BarChart,
                        data: dailyRuns,
                        theme: {
                            color: "#f3cb4f"
                        },
                        label: "Distance"
                    },
                    {
                        chartComponent: BarChart,
                        data: dailyElevation,
                        theme: {
                            color: "#e92088"
                        },
                        label: "Elevation"
                    }
                ]}
            />

            <MultiPlot
                yDataType={DATA_TYPES.NUMBER}
                xDataType={DATA_TYPES.DATE}
                yUnitScale={0.001}
                min={0}
                plotData={[
                    {
                        chartComponent: LineChart,
                        data: cumulative,
                        theme: {
                            color: "#35cb6c"
                        },
                        label: "30 day"
                    },
                    {
                        chartComponent: LineChart,
                        data: cumulativeTarget,
                        theme: {
                            color: "#e3bbd1"
                        },
                        label: "7 day"
                    }
                ]}
                height={400}
            />
            {/* Todo: Add montly totals / averages */}

            <h3>Cumulative Elevation</h3>
            <MultiPlot
                theme={{
                    color: "#8f2020"
                }}
                plotData={[
                    {
                        chartComponent: LineChart,
                        data: cumulativeElevation,
                        theme: {
                            color: "#8f2020"
                        },
                        label: "Cumulative Elevation"
                    }
                ]}
            />

            <h3>Left to complete</h3>
            <MultiPlot
                plotData={[
                    {
                        chartComponent: LineChart,
                        data: days.map((day) => {
                            return { y: day.remainingYearTarget, x: day.date };
                        }),
                        theme: {
                            color: "#4e4d4d"
                        },
                        label: "Cumulative Elevation"
                    }
                ]}
                yDataType={DATA_TYPES.NUMBER}
                yUnitScale={0.001}
            />
        </>
    );
};

const RunDetailsPage = ({ type = "run" }) => {
    const { years } = useSelector((state) => state.processedData.activities[type]);
    const currentYear = moment().year();
    const [tab, setTab] = useState(currentYear);
    const [display, setDisplay] = useState(DISPLAY.GRAPH);

    const [displayDaysWithoutActivity, setDisplayDaysWithoutActivity] = useState(false);

    const today = moment().startOf("day");

    if (!years) return null;
    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8 text-gray-800">{type}</h1>
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
                            <GraphDetails days={days} />
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
