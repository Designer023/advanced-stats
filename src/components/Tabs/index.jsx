import PropTypes from "prop-types";

const Tabs = ({ options, selected, onClick, color, size }) => {
    return (
        <div className="flex flex-wrap">
            <div className="w-full">
                <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                    {options.map((option) => (
                        <li key={option.value} className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <button
                                type="button"
                                className={`${size} w-full font-bold uppercase px-5 py-3 rounded block leading-normal ${option.value === selected ? `text-white bg-${color}` : `text-${color} bg-white`}`}
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
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired,
    selected: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string,
    size: PropTypes.string
};

Tabs.defaultProps = {
    color: "gray-600",
    size: "text-md"
};

export default Tabs;
