import { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";

// eslint-disable-next-line react/prop-types
const Legend = ({ data }) => {
    const legendRef = useRef(null);

    const w = 200;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const drawLegend = useCallback(() => {
        const legend = d3.select(legendRef.current);
        const legendRect = legend.selectAll("rect").data(data);

        legendRect
            .enter()
            .append("rect")
            .attr("x", w - 65)
            .attr("width", 10)
            .attr("height", 10);

        legendRect
            .attr("y", (d, i) => {
                return i * 20;
            })
            .style("fill", (d) => {
                return d[1];
            });

        const legendText = legend.selectAll("text").data(data);

        legendText
            .enter()
            .append("text")
            .attr("x", w - 52)
            .style("font-size", "11px");

        legendText
            .attr("y", (d, i) => {
                return i * 20 + 9;
            })
            .text((d) => {
                return d[0];
            });
    });

    useEffect(() => {
        if (legendRef.current) {
            drawLegend();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (legendRef.current) {
            drawLegend();
        }
    }, [data, drawLegend, legendRef]);

    return <g ref={legendRef} />;
};

export default Legend;
