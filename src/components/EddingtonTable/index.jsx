import React from "react";
import { Table, TH, TD } from "../Tables";

// eslint-disable-next-line react/prop-types
const EddingtonTable = ({ data }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <TH>Distance</TH>
                    <TH>Count</TH>
                    <TH>Remaining</TH>
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
                                <TD>{i}</TD>
                                <TD>{n}</TD>
                                <TD>☑️</TD>
                            </tr>
                        );
                    }

                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <tr key={i}>
                            <TD muted>{i}</TD>
                            <TD muted>{n}</TD>
                            <TD muted>-{i - n}️</TD>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default EddingtonTable;
