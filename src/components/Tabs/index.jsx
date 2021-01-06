/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

const Tabs = ({ options, selected, onClick, color }) => {
    return (
        <div className="flex flex-wrap">
            <div className="w-full">
                <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                    {options.map((option) => (
                        <li key={option.value} className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <button
                                type="button"
                                className={`text-md w-full font-bold uppercase px-5 py-3 rounded block leading-normal ${option.value === selected ? `text-white bg-${color}` : `text-${color} bg-white`}`}
                                onClick={() => onClick(option.value)}
                            >
                                {option.icon || null} {option.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

Tabs.propTypes = {
    color: PropTypes.string
};

Tabs.defaultProps = {
    color: "gray-600"
};

export default Tabs;
