import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, onClick, color }) => {
    return (
        <button
            type="button"
            className={`px-4 py-1 text-sm text-${color}-500 font-semibold rounded-md border border-${color}-500 hover:text-white hover:bg-${color}-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-${color}-600 focus:ring-offset-2`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string
};

Button.defaultProps = {
    color: "yellow"
};

export default Button;
