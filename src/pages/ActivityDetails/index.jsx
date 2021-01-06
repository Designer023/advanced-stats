/* eslint-disable react/prop-types,no-unused-vars */
import { useSelector } from "react-redux";
import moment from "moment";
import { Fragment, useState, useContext } from "react";

import Button from "../../components/Button";

import { KM } from "../../components/Formatters";

import DetailTable from "../../components/DetailTable";

import GraphSection from "../../components/GraphSection";
import { DayDataContext } from "./context";

const DISPLAY = {
    GRAPH: "GRAPH",
    TABLE: "TABLE"
};

const ActivityDetails = ({ type = "run" }) => {
    const { years } = useSelector((state) => state.processedData.activities[type]);
    const currentYear = moment().year();
    const [tab, setTab] = useState(currentYear);
    const [display, setDisplay] = useState(DISPLAY.GRAPH);

    const today = moment().endOf("day");

    if (!years) return null;
    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8 text-gray-800">{type}</h1>
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
                .map(({ year, days, total }) => {
                    const dataContext = { today, days };

                    return (
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
                            <DayDataContext.Provider value={dataContext}>
                                <>{display === DISPLAY.GRAPH ? <GraphSection days={days} /> : <DetailTable days={days} />}</>
                            </DayDataContext.Provider>
                        </Fragment>
                    );
                })}
        </div>
    );
};

export default ActivityDetails;
