/* eslint-disable react/prop-types,no-unused-vars */
import moment from "moment";
import { useContext, useMemo, useState } from "react";
import Graph from "../Graph";
import * as DATA_TYPES from "../Graph/constants/dataTypes";
import ScatterChart from "../Graph/Charts/Scatter";
import BarChart from "../Graph/Charts/Bar";
import LineChart from "../Graph/Charts/Line";
import Tabs from "../Tabs";
import TabContent from "../Tabs/TabContent";

import { DayDataContext } from "../../pages/ActivityDetails/context";

const useDailyDistance = () => {
    const { days } = useContext(DayDataContext);

    return useMemo(() => {
        return days.map((day) => {
            return { y: day.total, x: day.date };
        });
    }, [days]);
};

const useDailyElevation = () => {
    const { days } = useContext(DayDataContext);

    return useMemo(() => {
        return days.map((day) => {
            return { y: day.dayElevation, x: day.date };
        });
    }, [days]);
};

const useRolling7DayAverage = () => {
    const { days, today } = useContext(DayDataContext);

    return useMemo(() => {
        return days
            .filter((d, i) => {
                const date = moment(d.date);
                return date.isSameOrBefore(today) && i >= 7;
            })
            .map((day) => {
                return { y: day.ra7, x: day.date };
            });
    }, [days, today]);
};

const useRolling30DayAverage = () => {
    const { days, today } = useContext(DayDataContext);

    return useMemo(() => {
        return days
            .filter((d, i) => {
                const date = moment(d.date);
                return date.isSameOrBefore(today) && i >= 7;
            })
            .map((day) => {
                return { y: day.ra30, x: day.date };
            });
    }, [days, today]);
};

const useDailyRequiredDistance = () => {
    const { days, today } = useContext(DayDataContext);

    return useMemo(() => {
        return days.map((day) => {
            return { y: day.requiredPerDay, x: day.date };
        });
    }, [days]);
};

const useCulmulativeDistance = () => {
    const { days, today } = useContext(DayDataContext);

    return useMemo(() => {
        return days.map((day) => {
            return { y: day.yearCumulative, x: day.date };
        });
    }, [days]);
};

const useCulmulativeElevationGain = () => {
    const { days, today } = useContext(DayDataContext);

    return useMemo(() => {
        return days.map((day) => {
            return { y: day.yearElevationGain, x: day.date };
        });
    }, [days]);
};

const useCulmulativeTargetDistance = () => {
    const { days } = useContext(DayDataContext);

    return useMemo(() => {
        return days.map((day, i) => {
            // Todo: Get target from the store!
            return { y: (i * 3000000) / 366, x: day.date };
        });
    }, [days]);
};

const useRemainingDistance = () => {
    const { days } = useContext(DayDataContext);

    return useMemo(() => {
        return days.map((day) => {
            return { y: day.remainingYearTarget, x: day.date };
        });
    }, [days]);
};

const ProgressGraph = () => {
    const dailyRuns = useDailyDistance();
    const rolling7DayAvg = useRolling7DayAverage();
    const rolling30DayAvg = useRolling30DayAverage();
    const requiredDaily = useDailyRequiredDistance();

    return (
        <Graph
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
                    data: rolling7DayAvg,
                    theme: {
                        color: "#a4467a",
                        opacity: "0.5"
                    },
                    label: "7 day"
                },
                {
                    chartComponent: LineChart,
                    data: rolling30DayAvg,
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
            height={600}
        />
    );
};

const DistanceElevationGraph = () => {
    const dailyRuns = useDailyDistance();
    const dailyElevation = useDailyElevation();

    return (
        <Graph
            axis={{
                y: {
                    unitScale: 0.001
                },
                y2: {
                    unitScale: 1
                }
            }}
            yUnitScale={0.00001}
            yDataType={DATA_TYPES.NUMBER}
            xDataType={DATA_TYPES.DATE}
            min={0}
            plotData={[
                {
                    chartComponent: BarChart,
                    data: dailyRuns,
                    theme: {
                        color: "#206ae9"
                    },
                    label: "Distance (km)"
                },
                {
                    chartComponent: BarChart,
                    data: dailyElevation,
                    theme: {
                        color: "#e92088"
                    },
                    label: "Elevation (m)",
                    y2Axis: true
                }
            ]}
            height={600}
        />
    );
};

const TargetDistanceGraph = () => {
    const cumulative = useCulmulativeDistance();
    const cumulativeTarget = useCulmulativeTargetDistance();

    return (
        <Graph
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
                    label: "Progress"
                },
                {
                    chartComponent: LineChart,
                    data: cumulativeTarget,
                    theme: {
                        color: "#e3bbd1"
                    },
                    label: "Target"
                }
            ]}
            height={600}
        />
    );
};

const CumulativeElevationGainGraph = () => {
    const cumulativeGain = useCulmulativeElevationGain();
    const elevationDaily = useDailyElevation();

    return (
        <Graph
            theme={{
                color: "#8f2020"
            }}
            plotData={[
                {
                    chartComponent: LineChart,
                    data: cumulativeGain,
                    theme: {
                        color: "#8f2020"
                    },
                    label: "Cumulative Elevation"
                },
                {
                    chartComponent: BarChart,
                    data: elevationDaily,
                    theme: {
                        color: "#c19797"
                    },
                    label: "Daily Elevation",
                    y2Axis: true
                }
            ]}
            height={600}
        />
    );
};

const DistanceRemainingGraph = () => {
    const remaining = useRemainingDistance();
    const distance = useDailyDistance();

    return (
        <Graph
            plotData={[
                {
                    chartComponent: LineChart,
                    data: remaining,
                    theme: {
                        color: "#4e4d4d"
                    },
                    label: "Remaining distance"
                },
                {
                    chartComponent: BarChart,
                    data: distance,
                    theme: {
                        color: "#c19797"
                    },
                    label: "Daily distance",
                    y2Axis: true
                }
            ]}
            yDataType={DATA_TYPES.NUMBER}
            yUnitScale={0.001}
            height={600}
        />
    );
};

const PROGRESS_TYPES = ["OVERALL", "DISTANCE_ELEVATION", "PROGRESS_VS_TARGET", "CUMULATIVE_ELEVATION", "DISTANCE_REMAINING"];

const ProgressGraphs = () => {
    const [progressType, setProgressType] = useState(PROGRESS_TYPES[0]);

    const tabOptions = [
        { text: "Overall", value: "OVERALL" },
        { text: "Distance vs elevation", value: "DISTANCE_ELEVATION" },
        { text: "vs Target distance", value: "PROGRESS_VS_TARGET" },
        { text: "Elevation", value: "CUMULATIVE_ELEVATION" },
        { text: "Remaining", value: "DISTANCE_REMAINING" }
    ];

    return (
        <>
            <Tabs onClick={setProgressType} selected={progressType} options={tabOptions} color="yellow-500" size="text-sm" />
            <div className="py-6">
                <TabContent value="OVERALL" state={progressType}>
                    <ProgressGraph />
                </TabContent>

                <TabContent value="DISTANCE_ELEVATION" state={progressType}>
                    <DistanceElevationGraph />
                </TabContent>

                <TabContent value="PROGRESS_VS_TARGET" state={progressType}>
                    <TargetDistanceGraph />
                </TabContent>

                <TabContent value="CUMULATIVE_ELEVATION" state={progressType}>
                    <CumulativeElevationGainGraph />
                </TabContent>

                <TabContent value="DISTANCE_REMAINING" state={progressType}>
                    <DistanceRemainingGraph />
                </TabContent>

                {/* /!* Todo: Add montly totals / averages *!/ */}
            </div>
        </>
    );
};

const GraphSection = ({ days }) => {
    const [type, setType] = useState("progress");

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
            <Tabs
                selected={type}
                options={[
                    { text: "Progress", value: "progress", icon: "🏃‍♂️" },
                    { text: "Analyse", value: "analyse", icon: "🧐" }
                ]}
                onClick={setType}
            />

            <hr className="my-2" />

            {type === "analyse" ? (
                <>
                    <Graph
                        xDataType={DATA_TYPES.NUMBER}
                        yDataType={DATA_TYPES.NUMBER}
                        plotData={[
                            {
                                chartComponent: ScatterChart,
                                data: chr,
                                theme: {
                                    color: "#35cb6c"
                                },
                                label: "Distance vs. Suffer score"
                            }
                        ]}
                        yLabel="Distance"
                        xLabel="Suffer Score"
                        xLabelTransform={(d) => d / 1000}
                    />

                    <Graph
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

                    <Graph
                        xDataType={DATA_TYPES.NUMBER}
                        yDataType={DATA_TYPES.NUMBER}
                        plotData={[
                            {
                                chartComponent: ScatterChart,
                                data: paceDistance,
                                theme: {
                                    color: "#ee368b"
                                },
                                label: "Speed vs. Gain vs HR"
                            }
                        ]}
                        yLabel="Speed"
                        xLabel="Elevation gain"
                    />

                    <Graph
                        xDataType={DATA_TYPES.NUMBER}
                        yDataType={DATA_TYPES.NUMBER}
                        pad={{
                            x: 1,
                            y: 50
                        }}
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

                    <Graph
                        xDataType={DATA_TYPES.NUMBER}
                        yDataType={DATA_TYPES.NUMBER}
                        pad={{
                            x: 1,
                            y: 1
                        }}
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
                </>
            ) : null}

            {type === "progress" ? (
                <>
                    <ProgressGraphs />
                </>
            ) : null}
        </>
    );
};

export default GraphSection;
