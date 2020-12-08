import { Table, TD, TH } from "../Tables";

// eslint-disable-next-line react/prop-types
const ScoreTable = ({ data, overall }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <TH>Year</TH>
                    <TH>Score</TH>
                </tr>
            </thead>
            <tbody>
                {Object.entries(data).map(([year, { score }]) => {
                    return (
                        <tr>
                            <TD>{year}</TD>
                            <TD>{score}</TD>
                        </tr>
                    );
                })}

                <tr>
                    <TD>Overall</TD>
                    <TD>{overall}</TD>
                </tr>
            </tbody>
        </Table>
    );
};

export default ScoreTable;
