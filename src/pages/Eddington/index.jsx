// import { useSelector } from "react-redux";

import { useSelector } from "react-redux";
import EddingtonTable from "../../components/EddingtonTable";

const EddingtionDetailsPage = () => {
    const { breakdown, overall } = useSelector((state) => state.processedData.eddington.run);
    const { breakdown: bdRide, overall: overRide } = useSelector((state) => state.processedData.eddington.ride);

    return (
        <div>
            <h1 className="text-5xl font-semibold mt-8 mb-8 text-gray-800">
                Eddington Number(N<sub>Edd</sub>)
            </h1>
            <p>Eddington is credited with devising a measure of a cyclist&apos;s long-distance riding achievements. The Eddington number in the context of cycling is defined as the maximum number E such that the cyclist has cycled E miles on E days.</p>
            <hr className="mt-6 mb-12" />

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="text-3xl font-semibold mb-8 text-gray-800">Run: {overall}</h4>
                    <EddingtonTable data={breakdown} />
                </div>

                <div>
                    <h4 className="text-3xl font-semibold mb-8 text-gray-800">Ride: {overRide}</h4>
                    <EddingtonTable data={bdRide} />
                </div>
            </div>
        </div>
    );
};

export default EddingtionDetailsPage;
