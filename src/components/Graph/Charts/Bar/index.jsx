/* eslint-disable no-unused-vars */
import { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { dataPropType } from "../../PropTypes";

import { scaleData, parseData } from "../../utils";
import { PlotContext } from "../../context";
import * as DATA_TYPES from "../../constants/dataTypes";

const plotChart = ({ chartRef, data, width, height, x, y, theme, xDataType, yDataType, yScaler, yUnitScale, xUnitScale, xScaler, yDomain, index }) => {
    const yScale = scaleData(yDataType)().domain(yDomain).range([0, height]);

    const plotArea = d3.select(chartRef.current);

    plotArea.attr("width", width).attr("height", height).attr("transform", `translate(${x}, ${y})`);
    plotArea.selectAll("rect").remove(); // Remove existing content!

    const count = data.length + 1;
    // 366 * 2
    // const colSpacing = 0; // width < data.length * 2 ? 1 : 0;
    // const columnWidth = width / (data.length - colSpacing);
    // const colW = columnWidth; // < 0.5 ? 0.5 : columnWidth;
    const colSpacing = width < count * (1 + theme.colSpacing) ? 0 : theme.colSpacing;
    const columnWidth = width / count - colSpacing;
    const colW = 2; // columnWidth < 0.5 ? 0.5 : columnWidth;

    const xDomain = d3.extent(data, (d) => parseData(d.x, xDataType));
    // const xScaler = scaleData(xDataType)().domain(xDomain).range([0, width]);

    plotArea
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => xScaler(parseData(d.x, xDataType)))
        // .attr("x", (d, i) => i * colW)
        .attr("width", colW) // xScaler(1)
        .attr("y", 0) // height - yScale(d.y * yUnitScale))
        .attr("height", (d) => height - yScaler(d.y * yUnitScale))
        .attr("transform", (d) => `translate(${index * 2}, ${yScaler(d.y * yUnitScale)})`)
        // eslint-disable-next-line react/prop-types
        .attr("fill", theme.color)
        .attr("opacity", theme.opacity ? theme.color : "1");
};

// eslint-disable-next-line react/prop-types
const BarChart = ({ data, width, height, x, y, min, max, theme, xDataType, yScaler, yUnitScale, yDomain, yDataType, xScaler, xUnitScale, index }) => {
    const chartRef = useRef(null);

    // const {
    //     yAxis: { scale: yScaler, unitScale: yUnitScale, domain: yDomain, dataType: yDataType },
    //     xAxis: { scale: xScaler, unitScale: xUnitScale }
    // } = useContext(PlotContext);

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
        yDomain,
        index
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
    xDataType: DATA_TYPES.NUMBER
};

export default BarChart;
