import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { dataPropType } from "../../PropTypes";

import { minValue, maxValue } from "../../utils";

const plotChart = (chartRef, data, width, height, x, y, min, max, log, theme) => {
    const yScale = log ? d3.scaleSymlog : d3.scaleLinear;

    const hScale = yScale()
        .domain([minValue(data, min), maxValue(data, max)])
        .range([0, height]);

    const plotArea = d3.select(chartRef.current);

    plotArea.attr("width", width).attr("height", height).attr("transform", `translate(${x}, ${y})`);
    plotArea.selectAll("rect").remove(); // Remove existing content!

    const colSpacing = width < data.length * (1 + theme.colSpacing) ? 0 : theme.colSpacing;
    const columnWidth = width / data.length - colSpacing;
    const colW = columnWidth < 0.5 ? 0.5 : columnWidth;
    plotArea
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (dataItem, i) => i * (colW + colSpacing))
        .attr("y", ({ value }) => height - hScale(value))
        .attr("width", colW)
        .attr("height", ({ value }) => hScale(value))
        // eslint-disable-next-line react/prop-types
        .attr("fill", theme.color);
};

const BarChart = ({ data, width, height, x, y, min, max, log, theme }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (data && chartRef.current) {
            plotChart(chartRef, data, width, height, x, y, min, max, log, theme);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (data && chartRef.current) {
            plotChart(chartRef, data, width, height, x, y, min, max, log, theme);
        }
    }, [data, height, log, max, min, theme, width, x, y]);

    return <g ref={chartRef} />;
};

BarChart.propTypes = {
    data: dataPropType.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    theme: PropTypes.shape({
        color: PropTypes.string
    }).isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    log: PropTypes.bool
};

BarChart.defaultProps = {
    min: 0,
    max: null,
    log: false
};

export default BarChart;
