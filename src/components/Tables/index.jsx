/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import React from "react";

const HEADER = "px-4 py-2 text-grey-600 dark:bg-green-800 dark:text-grey-100";
const CELL = "border border-green-500 px-4 py-2 text-gray-900 font-medium bg-green-50 dark:bg-green-600 align-top";
const CELL_MUTED = "border border-grey-800 px-4 py-2 text-gray-900 font-medium text-opacity-25 h-5 align-top dark:bg-grey-700:text-grey-200";

const Table = ({ children }) => <table className="w-full mt-2 mb-8">{children}</table>;

const TH = ({ children }) => <th className={HEADER}>{children}</th>;

const TD = ({ children, muted, ...props }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <td className={muted ? CELL_MUTED : CELL} {...props}>
        {children}
    </td>
);

TD.propTypes = {
    muted: PropTypes.bool
};

TD.defaultProps = {
    muted: false
};

export { Table, TH, TD };
