const tableHeaderClasses = "px-4 py-2 text-grey-600 dark:bg-gray-800";
const tableClasses = "border border-green-500 px-4 py-2 text-gray-900 font-medium bg-green-50 dark:bg-gray-800";
const tableClassesOverall = "border border-yellow-500 px-4 py-2 text-gray-900 font-medium bg-yellow-50 dark:bg-gray-800";

// eslint-disable-next-line react/prop-types
const ScoreTable = ({ data, overall }) => {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className={tableHeaderClasses}>Year</th>
                    <th className={tableHeaderClasses}>Score</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(data).map(([year, { score }]) => {
                    return (
                        <tr>
                            <td className={tableClasses}>{year}</td>
                            <td className={tableClasses}>{score}</td>
                        </tr>
                    );
                })}

                <tr>
                    <td className={tableClassesOverall}>Overall</td>
                    <td className={tableClassesOverall}>{overall}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default ScoreTable;
