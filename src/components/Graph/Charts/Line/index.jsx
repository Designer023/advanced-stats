import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { dataPropType } from "../../PropTypes";

// eslint-disable-next-line no-unused-vars
import { minValue, maxValue, parseData, scaleData } from "../../utils";

const plotChart = ({ chartRef, data, width, height, x, y, min, max, theme, xDataType, yDataType }) => {
    const plotArea = d3.select(chartRef.current);

    const yScaler = scaleData(yDataType)()
        .domain([minValue(data, "y", min), maxValue(data, "y", max)])
        .range([height, 0]); // flip axis

    const xDomain = d3.extent(data, (d) => parseData(d.x, xDataType));
    const xScaler = scaleData(xDataType)().domain(xDomain).range([0, width]);

    plotArea.attr("width", width).attr("height", height).attr("transform", `translate(${x}, ${y})`);
    plotArea.selectAll("path").remove(); // Remove existing content!

    plotArea
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", theme.color)
        .attr("stroke-width", 1.5)
        .attr(
            "d",
            d3
                .line()
                .x((d) => xScaler(parseData(d.x, xDataType)))
                .y((d) => yScaler(d.y))
        );
};

const LineChart = ({ data, width, height, x, y, min, max, theme, xDataType, yDataType }) => {
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
    xDataType: "number",
    yDataType: "number"
};

export default LineChart;
