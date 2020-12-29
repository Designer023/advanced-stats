/* eslint-disable no-unused-vars */
import { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { dataPropType } from "../../PropTypes";

import { scaleData, parseData } from "../../utils";
import { PlotContext } from "../../context";
import * as DATA_TYPES from "../../constants/dataTypes";

const plotChart = ({ chartRef, data, width, height, x, y, theme, xDataType, yDataType, yScaler, yUnitScale, xUnitScale, xScaler, yDomain }) => {
    const yScale = scaleData(yDataType)().domain(yDomain).range([0, height]);

    const plotArea = d3.select(chartRef.current);

    plotArea.attr("width", width).attr("height", height).attr("transform", `translate(${x}, ${y})`);
    plotArea.selectAll("circle").remove(); // Remove existing content!

    const zDomain = d3.extent(data, (d) => parseData(d.z ? d.z : 100, DATA_TYPES.NUMBER));
    const zScaler = scaleData(DATA_TYPES.NUMBER)().domain(zDomain).range([0, 1]);

    plotArea
        .selectAll("rect")
        .data(data)
        .enter()
        .append("circle")
        // eslint-disable-next-line func-names
        .attr("cx", function (d) {
            return xScaler(d.x);
        })
        // eslint-disable-next-line func-names
        .attr("cy", function (d) {
            return yScaler(d.y);
        })
        .attr("r", 3)
        .attr("opacity", (d) => zScaler(d.z ? d.z : 165))
        .style("fill", theme.color);
};

const ScatterChart = ({ data, width, height, x, y, min, max, theme, xDataType }) => {
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

ScatterChart.propTypes = {
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

ScatterChart.defaultProps = {
    min: 0,
    max: null,
    xDataType: DATA_TYPES.NUMBER
};

export default ScatterChart;
