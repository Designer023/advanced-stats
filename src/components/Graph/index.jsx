import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import merge from "lodash/merge";
import useWindowSize from "../../hooks/useWindowSize";

import BarChart from "./Charts/Bar";
import XAxis from "./Axis/XAxis";
import YAxis from "./Axis/YAxis";

import { dataPropType } from "./PropTypes";

const baseTheme = {
    color: "#ccc",
    colSpacing: 0.5
};

// eslint-disable-next-line react/prop-types
const Graph = ({ data, height, theme, min, max, log, chartComponent: ChartComponent }) => {
    const graphRef = useRef(null);
    const { width: winWidth } = useWindowSize();

    const [elWidth, setElWidth] = useState(100);

    const mergedTheme = merge({}, baseTheme, theme);

    useEffect(() => {
        if (graphRef.current) {
            setElWidth(graphRef.current.offsetWidth);
        }
    }, [winWidth, data]);

    const padding = 5;
    const vAxiswidth = 50;
    const xAxisHeight = 30;
    const vAxisHeight = height - padding * 2 - xAxisHeight;
    const xAxisWidth = elWidth - padding * 2 - vAxiswidth;
    const plotWidth = elWidth - padding * 2 - vAxiswidth;
    const plotHeight = height - padding * 2 - xAxisHeight;
    const plotX = padding + vAxiswidth;
    const plotY = padding;
    const vX = padding + vAxiswidth;
    const vY = padding;
    const hX = padding + vAxiswidth;
    const hY = padding + plotHeight;

    return (
        <div ref={graphRef} style={{ width: "100%" }}>
            <svg width={elWidth} height={200}>
                <ChartComponent theme={mergedTheme} data={data} width={plotWidth} height={plotHeight} x={plotX} y={plotY} min={min} max={max} log={log} />
                <XAxis width={xAxisWidth} height={xAxisHeight} x={hX} y={hY} data={data} theme={mergedTheme} />
                <YAxis width={vAxiswidth} height={vAxisHeight} x={vX} y={vY} data={data} min={min} max={max} log={log} theme={mergedTheme} />
            </svg>
        </div>
    );
};

Graph.propTypes = {
    chartComponent: PropTypes.elementType,
    data: dataPropType.isRequired,
    theme: PropTypes.shape({
        color: PropTypes.string
    }),
    height: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    log: PropTypes.bool
};

Graph.defaultProps = {
    chartComponent: BarChart,
    theme: {},
    height: 200,
    min: 0,
    max: null,
    log: false
};

export default Graph;