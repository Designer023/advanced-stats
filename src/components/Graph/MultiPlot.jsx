/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import merge from "lodash/merge";
import * as d3 from "d3";
import useWindowSize from "../../hooks/useWindowSize";

import BarChart from "./Charts/Bar";
import XAxis from "./Axis/XAxis";
import YAxis from "./Axis/YAxis";

import { dataPropType } from "./PropTypes";
import { useDimensions } from "./hooks";
import { maxValue, minValue, parseData, scaleData } from "./utils";

const baseTheme = {
    color: "#ccc",
    colSpacing: 0.5
};

// eslint-disable-next-line react/prop-types
const MultiPlot = ({ data, height, min, max, xDataType, yDataType, theme }) => {
    const graphRef = useRef(null);
    const { width: winWidth } = useWindowSize();
    const [elWidth, setElWidth] = useState(100);

    const { plotWidth, plotHeight, plotX, plotY, xAxisWidth, xAxisHeight, hX, hY, vAxiswidth, vAxisHeight, vX, vY } = useDimensions({ height, elWidth });

    const combinedData = [];
    data.forEach((chart) => {
        combinedData.push(...chart.data);
    });

    const yScaler = scaleData(yDataType)()
        .domain([minValue(combinedData, "y", min), maxValue(combinedData, "y", max)])
        .range([vAxisHeight, 0]); // flip axis

    const xDomain = d3.extent(combinedData, (d) => parseData(d.x, xDataType));
    const xScaler = scaleData(xDataType)().domain(xDomain).range([0, plotWidth]);

    useEffect(() => {
        if (graphRef.current) {
            setElWidth(graphRef.current.offsetWidth);
        }
    }, [winWidth, data]);

    const mergedTheme = merge({}, baseTheme, theme);

    return (
        <div ref={graphRef} style={{ width: "100%" }}>
            <svg width={elWidth} height={200}>
                {data.map((item) => {
                    const { chartComponent: ChartComponent, data: plotData, theme: plotTheme, label } = item;
                    const mergedChartTheme = merge({}, baseTheme, plotTheme);

                    return (
                        <ChartComponent key={label} theme={mergedChartTheme} data={plotData} width={plotWidth} height={plotHeight} x={plotX} y={plotY} min={min} max={max} xDataType={xDataType} yDataType={yDataType} yScaler={yScaler} xScaler={xScaler} />
                    );
                })}
                <XAxis width={xAxisWidth} height={xAxisHeight} x={hX} y={hY} data={data} theme={mergedTheme} xDataType={xDataType} yScaler={yScaler} xScaler={xScaler} />
                <YAxis width={vAxiswidth} height={vAxisHeight} x={vX} y={vY} data={data} min={min} max={max} theme={mergedTheme} yDataType={yDataType} yScaler={yScaler} />
            </svg>
        </div>
    );
};

MultiPlot.propTypes = {
    // chartComponent: PropTypes.elementType,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            data: dataPropType.isRequired,
            chartComponent: PropTypes.elementType.isRequired,
            theme: PropTypes.shape({
                color: PropTypes.string
            })
        })
    ).isRequired,
    theme: PropTypes.shape({
        color: PropTypes.string
    }),
    height: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    xDataType: PropTypes.string,
    yDataType: PropTypes.string
};

MultiPlot.defaultProps = {
    // chartComponent: BarChart,
    height: 200,
    min: 0,
    max: null,
    xDataType: "date",
    yDataType: "number",
    theme: {}
};

export default MultiPlot;
