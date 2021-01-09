/* eslint-disable react/prop-types,no-unused-vars */
import { useSelector } from "react-redux";
import moment from "moment";
import { Fragment, useState, useEffect } from "react";

import { KM } from "../../components/Formatters";

import DetailTable from "../../components/DetailTable";

import GraphSection from "../../components/GraphSection";
import { DayDataContext } from "./context";
import Tabs from "../../components/Tabs";
import TabContent from "../../components/Tabs/TabContent";
import SelectDropDown from "../../components/SelectDropdown";
import DataPanel from "../../components/ActivityDetailTable/DataPanel";
import { EddingtonYearSummary } from "../Eddington";

const DISPLAY = {
    GRAPH: "GRAPH",
    TABLE: "TABLE",
    EDDINGTON: "EDDINGTON"
};

const ActivityDetails = ({ type = "run", title = "Run" }) => {
    const { years } = useSelector((state) => state.processedData.activities[type]);
    const { years: yearScores } = useSelector((state) => state.processedData.eddington[type]);

    const currentYear = moment().year();
    const [tab, setTab] = useState(currentYear);
    const [display, setDisplay] = useState(DISPLAY.GRAPH);

    useEffect(() => {
        const lastYear = Object.values(years).slice(-1)[0].year || currentYear;
        setTab(lastYear);
    }, [type, currentYear, years]);

    const today = moment().endOf("day");

    const displayOptions = [
        { text: "Graphs", value: DISPLAY.GRAPH },
        { text: "Data Table", value: DISPLAY.TABLE },
        { text: "Eddington Score", value: DISPLAY.EDDINGTON }
    ];

    if (!years) return null;
    return (
        <div>
            <div className="flex flex-row w-full mt-8 mb-8 justify-between flex-nowrap">
                <h1 className="text-5xl font-semibold  text-gray-800">{title}</h1>
                <div>
                    <SelectDropDown
                        value={tab}
                        onClick={setTab}
                        options={Object.values(years)
                            .map(({ year }) => {
                                return { text: year, value: year };
                            })
                            .reverse()}
                    />
                </div>
            </div>

            <hr className="my-2" />

            {Object.values(years)
                .filter((item) => item.year === tab)
                .map(({ year, days, total, totalElevation, totalActivityCount }) => {
                    const dataContext = { today, days };
                    const { score } = yearScores[year];
                    return (
                        <Fragment key={year}>
                            <div className="my-6">
                                <div className="flex flex-wrap">
                                    <DataPanel title="Activities" value={totalActivityCount} />
                                    <DataPanel
                                        title="Distance"
                                        value={
                                            <>
                                                <KM meters={total} /> km
                                            </>
                                        }
                                    />

                                    <DataPanel
                                        title="Avg distance"
                                        value={
                                            <>
                                                <KM meters={total / totalActivityCount} /> km
                                            </>
                                        }
                                    />

                                    <DataPanel
                                        title="Elevation"
                                        value={
                                            totalElevation < 10000 ? (
                                                <>{totalElevation} m</>
                                            ) : (
                                                <>
                                                    <KM meters={totalElevation} /> km
                                                </>
                                            )
                                        }
                                    />

                                    <DataPanel title="Target distance" value={3000} />
                                    <DataPanel title="Eddington value" value={score} />
                                </div>
                            </div>

                            <hr className="my-2" />
                            <Tabs onClick={setDisplay} options={displayOptions} selected={display} color="green-500" />

                            <hr className="my-2" />

                            <DayDataContext.Provider value={dataContext}>
                                <div className="py-6">
                                    <TabContent value={DISPLAY.GRAPH} state={display}>
                                        <GraphSection days={days} />
                                    </TabContent>

                                    <TabContent value={DISPLAY.TABLE} state={display}>
                                        <DetailTable days={days} />
                                    </TabContent>

                                    <TabContent value={DISPLAY.EDDINGTON} state={display}>
                                        <EddingtonYearSummary type={type} year={year} />
                                    </TabContent>
                                </div>
                            </DayDataContext.Provider>
                        </Fragment>
                    );
                })}
        </div>
    );
};

export default ActivityDetails;
