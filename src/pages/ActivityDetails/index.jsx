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

const DISPLAY = {
    GRAPH: "GRAPH",
    TABLE: "TABLE"
};

const DataPanel = ({ title, value }) => (
    <div className="w-full md:w-6/12 lg:w-3/12 xl:w-3/12 px-4 ">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg bg-gray-800">
            <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-yellow-500 uppercase font-bold text-xs">{title}</h5>
                        <span className="font-semibold text-xl text-white">{value}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const SelectDropDown = ({ options, onClick, value }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onClick={() => setOpen(!open)}
                >
                    {value}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" ariaHidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {open ? (
                <div className={` z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {options.map((option) => (
                            <button
                                onClick={() => {
                                    onClick(option.value);
                                    setOpen(false);
                                }}
                                type="button"
                                className="w-full focus:bg-gray-50 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

const ActivityDetails = ({ type = "run", title = "Run" }) => {
    const { years } = useSelector((state) => state.processedData.activities[type]);
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
        { text: "Data Table", value: DISPLAY.TABLE }
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
                                </div>
                            </DayDataContext.Provider>
                        </Fragment>
                    );
                })}
        </div>
    );
};

export default ActivityDetails;
