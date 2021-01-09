import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const DataPanel = ({ title, value, backgroundColor, titleColor, valueColor }) => (
    <div className="w-full md:w-6/12 lg:w-4/12 xl:w-4/12 px-4 ">
        <div className={`relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg bg-${backgroundColor}`}>
            <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className={`text-${titleColor} uppercase font-bold text-xs`}>{title}</h5>
                        <span className={`font-semibold text-xl text-${valueColor}`}>{value}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

DataPanel.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    backgroundColor: PropTypes.string,
    titleColor: PropTypes.string,
    valueColor: PropTypes.string
};

DataPanel.defaultProps = {
    backgroundColor: "gray-800",
    titleColor: "yellow-500",
    valueColor: "white"
};

export default DataPanel;
