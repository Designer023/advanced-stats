/* eslint-disable no-unused-vars */
import { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { dataPropType } from "../../PropTypes";

import { scaleData, parseData } from "../../utils";
import { PlotContext } from "../../context";

const plotChart = ({ chartRef, data, width, height, x, y, theme, xDataType, yDataType, yScaler, yUnitScale, xUnitScale, yDomain }) => {
    const yScale = scaleData(yDataType)().domain(yDomain).range([0, height]);

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
        .attr("x", (d) => xScaler(parseData(d.x, xDataType)))
        .attr("width", colW)
        .attr("y", (d) => 0) // height - yScale(d.y * yUnitScale))
        .attr("height", (d) => height - yScaler(d.y * yUnitScale))
        .attr("transform", (d) => `translate(0, ${yScaler(d.y * yUnitScale)})`)
        // eslint-disable-next-line react/prop-types
        .attr("fill", theme.color)
        .attr("opacity", "1");
};

const BarChart = ({ data, width, height, x, y, min, max, theme, xDataType }) => {
    const chartRef = useRef(null);

    const {
        yAxis: { scale: yScaler, unitScale: yUnitScale, domain: yDomain, dataType: yDataType },
        xAxis: { scale: xScaler, unitScale: xUnitScale }
    } = useContext(PlotContext);

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
        yDataType,
        yScaler,
        xScaler,
        yUnitScale,
        xUnitScale,
        yDomain
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
    xDataType: PropTypes.string
};

BarChart.defaultProps = {
    min: 0,
    max: null,
    xDataType: "number"
};

export default BarChart;
