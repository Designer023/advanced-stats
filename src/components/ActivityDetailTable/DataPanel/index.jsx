// eslint-disable-next-line react/prop-types
const DataPanel = ({ title, value }) => (
    <div className="w-full md:w-6/12 lg:w-4/12 xl:w-4/12 px-4 ">
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

export default DataPanel;
