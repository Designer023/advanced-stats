// import { useSelector } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import EddingtonTable from "../../components/EddingtonTable";
import ScoreTable from "../../components/ScoreTable";

// eslint-disable-next-line react/prop-types
const EddingtonYear = ({ year, type }) => {
    // eslint-disable-next-line no-unused-vars
    const { breakdown, score } = useSelector((state) => state.processedData.eddington[type].years[year]);

    return (
        <>
            <h3 className="text-xl font-semibold mb-b mt-8 text-gray-800">
                {year} : {score}
            </h3>
            <EddingtonTable data={breakdown} />
        </>
    );
};

// eslint-disable-next-line react/prop-types
const EddingtonActivity = ({ type }) => {
    const { overall, years, breakdown } = useSelector((state) => state.processedData.eddington.run);

    const [view, setView] = useState("data");

    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState(breakdown);

    return (
        <>
            <h4 className="text-3xl font-semibold mb-2 text-gray-800 flex justify-between">
                <span>Run</span>
                <span>{overall}</span>
            </h4>
            <hr className="mb-6 mt-2" />

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

                    <div className="mt-4">{view === "data" ? <EddingtonTable data={data} /> : <p>Graph - coming soon!</p>}</div>
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

const EddingtionDetailsPage = () => {
    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8 text-gray-800">
                Eddington Number(N<sub>Edd</sub>)
            </h1>
            <p>Eddington is credited with devising a measure of a cyclist&apos;s long-distance riding achievements. The Eddington number in the context of cycling is defined as the maximum number E such that the cyclist has cycled E miles on E days.</p>
            <hr className="mt-6 mb-12" />

            <EddingtonActivity type="run" />
        </div>
    );
};

export default EddingtionDetailsPage;
