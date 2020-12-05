import React from "react";

const tableHeaderClasses = "px-4 py-2 text-grey-600 dark:bg-gray-800";
const tableClasses = "border border-green-500 px-4 py-2 text-gray-900 font-medium bg-green-50 dark:bg-gray-800";
const tableClassesTodo = "border border-grey-800 px-4 py-2 text-gray-900 font-medium text-opacity-25";

// eslint-disable-next-line react/prop-types
const EddingtonTable = ({ data }) => {
    return (
        <table className="table-auto">
            <thead>
                <tr>
                    <th className={tableHeaderClasses}>Distance</th>
                    <th className={tableHeaderClasses}>Count</th>
                    <th className={tableHeaderClasses}>Remaining</th>
                </tr>
            </thead>
            <tbody>
                {/* eslint-disable-next-line react/prop-types */}
                {data.map((n, i) => {
                    const achieved = n >= i;
                    if (i === 0) return null;

                    if (achieved) {
                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <tr key={i}>
                                <td className={tableClasses}>{i}</td>
                                <td className={tableClasses}>{n}</td>
                                <td className={tableClasses}>☑️</td>
                            </tr>
                        );
                    }

                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <tr key={i}>
                            <td className={tableClassesTodo}>{i}</td>
                            <td className={tableClassesTodo}>{n}</td>
                            <td className={tableClassesTodo}>-{i - n}️</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default EddingtonTable;
