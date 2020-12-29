import { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { dataPropType } from "../../PropTypes";
import { PlotContext } from "../../context";
import { parseData } from "../../utils";
import * as DATA_TYPES from "../../constants/dataTypes";

const plotChart = ({ chartRef, data, width, height, x, y, theme, xDataType, xScaler, yScaler, yUnitScale, xUnitScale }) => {
    const plotArea = d3.select(chartRef.current);

    plotArea.attr("width", width).attr("height", height).attr("transform", `translate(${x}, ${y})`);
    plotArea.selectAll("path").remove(); // Remove existing content!

    plotArea
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", theme.color)
        .attr("stroke-width", 1.5)
        .attr("opacity", theme.opacity ? theme.color : "1")
        .attr(
            "d",
            d3
                .line()
                .curve(d3.curveMonotoneX)
                .x((d) => xScaler(parseData(d.x, xDataType)) * xUnitScale)
                .y((d) => yScaler(d.y * yUnitScale))
        );
};

const LineChart = ({ data, width, height, x, y, min, max, theme, xDataType, yDataType }) => {
    const chartRef = useRef(null);

    const {
        yAxis: { scale: yScaler, unitScale: yUnitScale },
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
        xScaler,
        yScaler,
        yUnitScale,
        xUnitScale
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
    }, [data, height, max, min, theme, width, x, y, xDataType, plotOptions]);

    return <g ref={chartRef} />;
};

LineChart.propTypes = {
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

LineChart.defaultProps = {
    min: 0,
    max: null,
    xDataType: DATA_TYPES.NUMBER,
    yDataType: DATA_TYPES.NUMBER
};

export default LineChart;
