import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EddingtonTable from "../../components/EddingtonTable";
import ScoreTable from "../../components/ScoreTable";
import Graph from "../../components/Graph";
import BarChart from "../../components/Graph/Charts/Bar";
import * as DATA_TYPES from "../../components/Graph/constants/dataTypes";
import Tabs from "../../components/Tabs";
import TabContent from "../../components/Tabs/TabContent";
import SelectDropDown from "../../components/SelectDropdown";
import DataPanel from "../../components/DataPanel";

// eslint-disable-next-line react/prop-types
const EddingtonYear = ({ year, type }) => {
    // eslint-disable-next-line no-unused-vars
    const { breakdown, score } = useSelector((state) => state.processedData.eddington[type].years[year]);

    return (
        <>
            <h3 className="text-xl font-semibold mb-b mt-8 text-gray-800">
                {year} : {score}
            </h3>
            <div>
                <Graph
                    xDataType={DATA_TYPES.NUMBER}
                    yDataType={DATA_TYPES.NUMBER}
                    plotData={[
                        {
                            chartComponent: BarChart,
                            data: breakdown
                                .filter((i) => i > 0)
                                .map((value, i) => {
                                    return { y: value, x: i };
                                }),
                            theme: {
                                color: "#35cb6c"
                            },
                            label: "Eddington values"
                        }
                    ]}
                    yLabel="Count"
                    xLabel="Number"
                />
            </div>

            <EddingtonTable data={breakdown} />
        </>
    );
};

const activityTypes = ["Run", "Ride", "Hike", "Walk"];

// eslint-disable-next-line react/prop-types,no-unused-vars
const EddingtonActivity = ({ type }) => {
    const { overall, years, breakdown } = useSelector((state) => state.processedData.eddington[type]);

    const [view, setView] = useState("data");

    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState(breakdown);
    const currentYear = null; // `${moment().year()}`;

    const [tab, setTab] = useState(null);

    useEffect(() => {
        const lastYear = Object.values(years).slice(-1)[0].year || currentYear;
        setTab(lastYear);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const lastYear = Object.values(years).slice(-1)[0].year || currentYear;
        setTab(lastYear);
    }, [type, currentYear, years]);

    return (
        <>
            <div className="flex flex-row w-full mt-8 mb-8 justify-between flex-nowrap">
                <h4 className="text-3xl font-semibold mb-2 text-gray-800">
                    <span>{type}</span>
                </h4>

                <div>
                    {tab ? (
                        <SelectDropDown
                            value={tab}
                            onClick={setTab}
                            options={Object.keys(years)
                                .map((year) => {
                                    return { text: year, value: year };
                                })
                                .reverse()}
                        />
                    ) : null}
                </div>
            </div>

            <hr className="mb-6 mt-2" />

            {tab ? <EddingtonYear year={tab} type={type} key={`${tab}=${type}`} /> : null}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <ScoreTable data={years} overall={overall} />
                </div>
                <div>
                    <nav className="flex flex-col sm:flex-row">
                        <button onClick={() => setView("data")} type="button" className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${view === "data" ? "text-blue-500 border-b-2 font-medium border-blue-500" : ""}`}>
                            Data
                        </button>
                        <button onClick={() => setView("graph")} type="button" className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${view === "graph" ? "text-blue-500 border-b-2 font-medium border-blue-500" : ""}`}>
                            Graph
                        </button>
                    </nav>

                    <div className="mt-4">
                        {view === "data" ? (
                            <EddingtonTable data={data} />
                        ) : (
                            <div>
                                <Graph
                                    xDataType={DATA_TYPES.NUMBER}
                                    yDataType={DATA_TYPES.NUMBER}
                                    plotData={[
                                        {
                                            chartComponent: BarChart,
                                            data: data
                                                .filter((i) => i > 0)
                                                .map((value, i) => {
                                                    return { y: value, x: i };
                                                }),
                                            theme: {
                                                color: "#333b37"
                                            },
                                            label: "Activities at distance N"
                                        }
                                    ]}
                                    yLabel="Count"
                                    xLabel="Number"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {Object.keys(years).map((year) => (
                    <div>
                        <EddingtonYear year={year} type={type} />
                    </div>
                ))}
            </div>
        </>
    );
};

// eslint-disable-next-line react/prop-types
export const EddingtonYearSummary = ({ type, year }) => {
    // eslint-disable-next-line no-unused-vars
    const { breakdown, score } = useSelector((state) => state.processedData.eddington[type].years[year]);

    let nextGoal = { next: 0, diff: 0 };

    for (let i = 1; i < breakdown.length; i += 1) {
        const value = breakdown[i];
        // if (value > i) continue;
        if (value < i) {
            nextGoal = { next: i, diff: i - value };
            break;
        }
    }

    return (
        <>
            <div className="my-6">
                <div className="flex flex-wrap">
                    <DataPanel value={score} title="Year Eddington score" />
                    <DataPanel value={`${breakdown.length - 1} km`} title="Maximum distance" />
                    <DataPanel value={`${nextGoal.next} - ${nextGoal.diff} ${type}s`} title="Next score" />
                </div>
            </div>

            <div>
                <Graph
                    xDataType={DATA_TYPES.NUMBER}
                    yDataType={DATA_TYPES.NUMBER}
                    plotData={[
                        {
                            chartComponent: BarChart,
                            data: breakdown
                                .filter((i) => i > 0)
                                .map((value, i) => {
                                    return { y: value, x: i };
                                }),
                            theme: {
                                color: "#35cb6c"
                            },
                            label: "Activities at distance N"
                        }
                    ]}
                    yLabel="Count"
                    xLabel="Number"
                    height={400}
                />
            </div>

            <div>
                <EddingtonTable data={breakdown} />
            </div>
        </>
    );
};

const DISPLAY = {
    GRAPH: "GRAPH",
    TABLE: "TABLE"
};

// eslint-disable-next-line react/prop-types
export const EddingtonSummary = ({ type }) => {
    // eslint-disable-next-line no-unused-vars
    const { breakdown, overall } = useSelector((state) => state.processedData.eddington[type]);

    const displayOptions = [
        { text: "Graphs", value: DISPLAY.GRAPH },
        { text: "Data Table", value: DISPLAY.TABLE }
    ];

    const [display, setDisplay] = useState(DISPLAY.GRAPH);

    let nextGoal = { next: 0, diff: 0 };

    for (let i = 1; i < breakdown.length; i += 1) {
        const value = breakdown[i];
        // if (value > i) continue;
        if (value < i) {
            nextGoal = { next: i, diff: i - value };
            break;
        }
    }

    return (
        <>
            <hr className="my-2" />
            <div className="my-6">
                <div className="flex flex-wrap">
                    <DataPanel value={overall} title="All time Eddington score" />
                    <DataPanel value={`${breakdown.length - 1} km`} title="Maximum distance" />
                    <DataPanel value={`${nextGoal.next} - ${nextGoal.diff} ${type}s`} title="Next score" />
                </div>
            </div>

            <hr className="my-2" />
            <Tabs onClick={setDisplay} options={displayOptions} selected={display} />

            <div className="py-6">
                <TabContent value={DISPLAY.GRAPH} state={display}>
                    <Graph
                        xDataType={DATA_TYPES.NUMBER}
                        yDataType={DATA_TYPES.NUMBER}
                        plotData={[
                            {
                                chartComponent: BarChart,
                                data: breakdown
                                    .filter((i) => i > 0)
                                    .map((value, i) => {
                                        return { y: value, x: i };
                                    }),
                                theme: {
                                    color: "#35cb6c"
                                },
                                label: "Eddington values"
                            }
                        ]}
                        yLabel="Count"
                        xLabel="Number"
                        height={400}
                    />
                </TabContent>

                <TabContent value={DISPLAY.TABLE} state={display}>
                    <EddingtonTable data={breakdown} />
                </TabContent>
            </div>
        </>
    );
};

const EddingtionDetailsPage = () => {
    // const types = useSelector((state) => state.processedData.eddington);

    const [currentType, setType] = useState(activityTypes[0]);

    const typeOptions = activityTypes.map((t) => {
        return { text: t, value: t };
    });

    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8 text-gray-800">
                Eddington Number(N<sub>Edd</sub>)
            </h1>
            <p>Eddington is credited with devising a measure of a cyclist&apos;s long-distance riding achievements. The Eddington number in the context of cycling is defined as the maximum number E such that the cyclist has cycled E miles on E days.</p>
            <hr className="mt-6 mb-12" />

            <Tabs onClick={setType} selected={currentType} options={typeOptions} color="green-500" />

            <div className="py-6">
                <TabContent value="Run" state={currentType}>
                    <EddingtonSummary type="run" />

                    {/* <EddingtonActivity type="run" /> */}
                </TabContent>

                <TabContent value="Ride" state={currentType}>
                    <EddingtonSummary type="ride" />
                    {/* <EddingtonActivity type="ride" /> */}
                </TabContent>

                <TabContent value="Hike" state={currentType}>
                    <EddingtonSummary type="hike" />
                    {/* <EddingtonActivity type="hike" /> */}
                </TabContent>

                <TabContent value="Walk" state={currentType}>
                    <EddingtonSummary type="walk" />
                    {/* <EddingtonActivity type="walk" /> */}
                </TabContent>
            </div>
        </div>
    );
};

export default EddingtionDetailsPage;
