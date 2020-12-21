/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { dataPropType } from "../../PropTypes";

import { minValue, maxValue, scaleData, parseData } from "../../utils";

const plotChart = ({ chartRef, data, width, height, x, y, min, max, theme, xDataType, yDataType }) => {
    const yScale = scaleData(yDataType)()
        .domain([minValue(data, "y", min), maxValue(data, "y", max)])
        .range([0, height]);

    const plotArea = d3.select(chartRef.current);

    plotArea.attr("width", width).attr("height", height).attr("transform", `translate(${x}, ${y})`);
    plotArea.selectAll("rect").remove(); // Remove existing content!

    const colSpacing = width < data.length * (1 + theme.colSpacing) ? 0 : theme.colSpacing;
    const columnWidth = width / data.length - colSpacing;
    const colW = columnWidth < 0.5 ? 0.5 : columnWidth;

    const xDomain = d3.extent(data, (d) => parseData(d.x, xDataType));
    const xScaler = scaleData(xDataType)().domain(xDomain).range([0, width]);

    plotArea
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        // .attr("x", (d) => i * (colW + colSpacing))
        .attr("x", (d) => xScaler(parseData(d.x, xDataType)))
        // .x((d, i) => xScaler(parseData(d.x, xDataType)))
        .attr("y", (d) => height - yScale(d.y))
        .attr("width", colW)
        .attr("height", (d) => yScale(d.y))
        // eslint-disable-next-line react/prop-types
        .attr("fill", theme.color);
};

const BarChart = ({ data, width, height, x, y, min, max, theme, xDataType, yDataType }) => {
    const chartRef = useRef(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const plotOptions = {
        chartRef,
        data,
        width,
        height,
        x,
        y,
        min,
        max,
        theme,
        xDataType,
        yDataType
    };

    useEffect(() => {
        if (data && chartRef.current) {
            plotChart(plotOptions);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (data && chartRef.current) {
            plotChart(plotOptions);
        }
    }, [data, height, max, min, theme, width, x, y, plotOptions]);

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
    xDataType: PropTypes.string,
    yDataType: PropTypes.string
};

BarChart.defaultProps = {
    min: 0,
    max: null,
    xDataType: "number",
    yDataType: "number"
};

export default BarChart;
